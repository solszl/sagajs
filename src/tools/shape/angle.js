/**
 *
 * Created Date: 2020-03-26, 12:29:42 (zhenliang.sun)
 * Last Modified: 2020-03-26, 22:42:54 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

import log from 'loglevel'
import { getRelativePointerPosition } from '../command/utils'
import BaseShape from './baseShape'
import { Color } from './theme'
import Konva from 'konva'

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
    const mouse = getRelativePointerPosition(this.getStage())
    if (this.currentAnchor) {
      this.currentAnchor.position({ x: mouse.x - this.x(), y: mouse.y - this.y() })
    }

    this._dragAnchorMove()
    this.getLayer().batchDraw()
  }

  _mouseUp(e) {
    const mouse = getRelativePointerPosition(this.getStage())

    if (this.currentAnchor) {
      this.currentAnchor.position({ x: mouse.x - this.x(), y: mouse.y - this.y() })
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

  _onMouseOver(e) {
    super._onMouseOver(e)
    this.anchors.forEach(anchor => {
      anchor.stroke(Color.ANCHOR_HOVER)
    })
    ;[this.line1, this.line2].forEach(line => {
      if (line) {
        line.stroke(Color.ITEM_HOVER)
      }
    })

    this.getLayer().batchDraw()
  }

  _onMouseOut(e) {
    super._onMouseOut(e)
    this.anchors.forEach(anchor => {
      anchor.stroke(Color.ANCHOR_NORMAL)
    })
    ;[this.line1, this.line2].forEach(line => {
      if (line) {
        line.stroke(Color.ITEM_NORMAL)
      }
    })

    this.getLayer().batchDraw()
  }

  _dragMove() {
  }

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
        hitStrokeWidth: 20
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
        hitStrokeWidth: 20
      })
      this.add(this.line2)
    }

    this.line2.points(points)

    this.getLayer().batchDraw()
  }

  _dragTextFieldMove() {}
}

export default Angle
