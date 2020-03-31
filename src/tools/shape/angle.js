/**
 *
 * Created Date: 2020-03-26, 12:29:42 (zhenliang.sun)
 * Last Modified: 2020-04-01, 00:01:30 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

import Konva from 'konva'
import { getRelativePointerPosition } from '../command/utils'
import BaseShape from './baseShape'
import { Color } from './theme'
import { connectedObject, createTextComponent, getPoint2D } from './utils'

/**
 * 角度
 *
 * @class Angle
 * @extends {BaseShape}
 * @author zhenliang.sun
 */
class Angle extends BaseShape {
  constructor(spacing, cfg = {}) {
    super(cfg)
    this._shapeType = 'angle'
    this.spacing = spacing
    this.anchors = []

    this.line1 = null
    this.line2 = null

    this.textField = null
    this.textDragged = false

    this.dashLine = null

    this.ee = {
      mousedown: this._mouseDown.bind(this),
      mousemove: this._mouseMove.bind(this),
      mouseup: this._mouseUp.bind(this)
    }

    // 当前正在操作哪个锚点
    this.currentAnchor = null
    // 创建角度工具的时候，计量还需要添加几个anchor
    this.remainAnchorCount = 3

    this.initialized = false

    this.draggable(true)
    this.on('dragmove', this._dragMove.bind(this))

    this._calcAngleThrottle = this._calcAngle.throttle(50)
  }

  start() {
    // 给stage绑定事件
    for (const event in this.ee) {
      this.getStage().on(event, this.ee[event])
    }

    this._mouseDown(null)
  }

  _mouseDown(e) {
    const mouse = getRelativePointerPosition(this.getStage())

    if (this.remainAnchorCount === 3) {
      const anchor = this.createAnchor()
      anchor.position({ x: 0, y: 0 })
      anchor.on('dragmove', this._dragAnchorMove.bind(this))
      anchor.moveToTop()
      this.add(anchor)
      this.currentAnchor = anchor

      this.anchors.push(this.currentAnchor)
      this.remainAnchorCount -= 1

      this.position(mouse)
    }

    this.getLayer().batchDraw()
  }

  _mouseMove(e) {
    if (this.currentAnchor) {
      const mouse = getRelativePointerPosition(this.getStage())
      this.currentAnchor.position({
        x: mouse.x - this.x(),
        y: mouse.y - this.y()
      })
    }

    this._dragAnchorMove()
    this.getLayer().batchDraw()
  }

  _mouseUp(e) {
    if (this.currentAnchor) {
      const mouse = getRelativePointerPosition(this.getStage())
      this.currentAnchor.position({
        x: mouse.x - this.x(),
        y: mouse.y - this.y()
      })
    }

    this.getLayer().batchDraw()

    if (this.anchors.length === 3) {
      for (const event in this.ee) {
        this.getStage().removeEventListener(event, this.ee[event])
      }
      this.fire('angle_create_completed')
      this.initialized = true
      return
    }

    const nextAnchor = this.createAnchor()
    nextAnchor.moveToTop()
    nextAnchor.position({ x: 0, y: 0 })
    nextAnchor.on('dragmove', this._dragAnchorMove.bind(this))
    this.add(nextAnchor)
    this.currentAnchor = nextAnchor

    this.anchors.push(this.currentAnchor)
    this.remainAnchorCount -= 1
  }

  _dragMove() {}

  _dragAnchorMove() {
    const anchor1 = this.anchors[0]
    const anchor2 = this.anchors[1]
    const anchor3 = this.anchors[2]

    if (!anchor2) {
      return
    }

    const x1 = anchor1.x()
    const y1 = anchor1.y()
    const x2 = anchor2.x()
    const y2 = anchor2.y()
    let points = [x1, y1, x2, y2]
    if (!this.line1) {
      this.line1 = new Konva.Line({
        stroke: Color.ITEM_NORMAL,
        hitStrokeWidth: 20,
        name: 'node-item'
      })
      this.add(this.line1)
    }

    this.line1.points(points)

    if (!anchor3) {
      return
    }

    const x3 = anchor3.x()
    const y3 = anchor3.y()
    points = [x2, y2, x3, y3]
    if (!this.line2) {
      this.line2 = new Konva.Line({
        stroke: Color.ITEM_NORMAL,
        hitStrokeWidth: 20,
        name: 'node-item'
      })
      this.add(this.line2)
    }

    this.line2.points(points)
    this._calcAngleThrottle()

    if (this.textDragged) {
      const p1 = getPoint2D(this.anchors[0])
      const p2 = getPoint2D(this.anchors[1])
      const p3 = getPoint2D(this.anchors[2])
      const from = [p1, p2, p3]

      connectedObject(this.textField, from, this.dashLine)
    } else {
      const p2 = getPoint2D(this.anchors[1])
      this.textField.position({ x: p2.x + 10, y: p2.y })
    }

    this.getLayer().batchDraw()
  }

  _dragTextFieldMove() {
    this.textDragged = true

    // 判断是否存在虚线
    this.dashLine = this.dashLine || this.findOne('#dashLine')
    if (!this.dashLine) {
      this.dashLine = new Konva.Line({
        stroke: Color.ITEM_HOVER,
        strokeWidth: 2,
        lineJoin: 'round',
        dash: [6, 3],
        id: 'dashLine',
        name: 'node-dashline'
      })

      this.add(this.dashLine)
      this.dashLine.moveToBottom()
    }

    const p1 = getPoint2D(this.anchors[0])
    const p2 = getPoint2D(this.anchors[1])
    const p3 = getPoint2D(this.anchors[2])
    const from = [p1, p2, p3]
    connectedObject(this.textField, from, this.dashLine)
  }

  /**
   * 计算角度, 余弦定理 cosA = (AB*AB + AC*AC - BC*BC) / (2 * AB * AC)
   * via: https://blog.csdn.net/zhang1244j/article/details/55053184
   *
   * @memberof Angle
   */
  _calcAngle() {
    const p1 = getPoint2D(this.anchors[0])
    const p2 = getPoint2D(this.anchors[1])
    const p3 = getPoint2D(this.anchors[2])

    const cosP2 =
      (p2.distance(p1) ** 2 + p2.distance(p3) ** 2 - p1.distance(p3) ** 2) /
      (2 * p2.distance(p3) * p2.distance(p1))

    const angleP2 = ((Math.acos(cosP2) * 180) / Math.PI).toFixed(1)

    if (!this.textField) {
      this.textField = createTextComponent()
      this.textField.position({ x: p2.x + 10, y: p2.y })
      this.textField.draggable(true)
      this.textField.on(
        'dragmove',
        this._dragTextFieldMove.bind(this).throttle(30)
      )
      this.add(this.textField)
    }

    this.textField.text(`${angleP2}°`)
  }
}

export default Angle
