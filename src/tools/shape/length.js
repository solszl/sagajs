/**
 *
 * Created Date: 2020-03-16, 16:51:48 (zhenliang.sun)
 * Last Modified: 2020-04-08, 14:30:30 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

import { Line } from 'konva/lib/shapes/Line'
import Point2D from '../../geometry/point2D'
import { getRelativePointerPosition } from './../command/utils'
import BaseShape from './baseShape'
import { Color } from './theme'
import { connectedObject, createTextComponent, getPoint2D } from './utils'

/**
 * 长度测量工具
 * 2个圆，1个线，一个文案，一个虚线连接
 *
 * @class Length
 * @extends {BaseShape}
 */
class Length extends BaseShape {
  constructor(spacing, cfg = {}) {
    super(cfg)

    this.ee = {
      mousemove: this._mouseMove.bind(this),
      mouseup: this._mouseUp.bind(this)
    }

    this.spacing = spacing

    this.anchor1 = null
    this.anchor2 = null

    this.line = null

    this.textField = null

    this.dashLine = null
    // 如果抓取过文本，那么再拖动锚点的时候，文本就不再跟随锚点动了
    this.textDragged = false
  }

  start() {
    // 给stage绑定事件
    for (const event in this.ee) {
      this.getStage().on(event, this.ee[event])
    }

    const mouse = getRelativePointerPosition(this.getStage())

    this.anchor1 = this.createAnchor()
    this.add(this.anchor1)
    this.position(mouse)
    this.anchor1.position({ x: 0, y: 0 })

    this.anchor2 = this.createAnchor()
    this.add(this.anchor2)
    this.anchor2.position({ x: 0, y: 0 })

    this.line = new Line({
      stroke: Color.ITEM_NORMAL,
      hitStrokeWidth: 20,
      name: 'node-item'
    })
    this.add(this.line)

    this.textField = createTextComponent()
    this.textField.draggable(true)
    this.add(this.textField)

    this.draggable(true)

    this.draw()
    ;[this.anchor1, this.anchor2].forEach(anchor => {
      anchor.on('dragmove', this._dragAnchorMove.bind(this).throttle(30))
    })

    this.textField.on('dragmove', this._dragText.bind(this))

    this.on('dragmove', this._dragMove.bind(this))
  }

  _mouseMove(e) {
    const mouse = getRelativePointerPosition(this.getStage())
    const position = { x: mouse.x - this.x(), y: mouse.y - this.y() }
    this.anchor2.position(position)

    this._dragAnchorMove()
  }

  _mouseUp(e) {
    for (const event in this.ee) {
      this.getStage().removeEventListener(event, this.ee[event])
    }

    const mouse = getRelativePointerPosition(this.getStage())
    const position = { x: mouse.x - this.x(), y: mouse.y - this.y() }
    this.anchor2.position(position)
    this.getLayer().batchDraw()
  }

  _dragAnchorMove() {
    const x1 = this.anchor1.x()
    const y1 = this.anchor1.y()
    const x2 = this.anchor2.x()
    const y2 = this.anchor2.y()
    const points = [x1, y1, x2, y2]
    this.line.points(points)

    const distance = Math.sqrt((x2 - x1) ** 2, (y2 - y1) ** 2)
    const len = (distance * this.spacing.rowSpacing).toFixed(2) + 'mm'

    // 如果没拖动过文本，那么就让他靠右边显示
    // 如果拖过的话，那么就固定在那个位置。
    if (!this.textDragged) {
      const useAnchor = x2 - x1 > 0 ? this.anchor2 : this.anchor1
      this.textField.position({ x: useAnchor.x() + 10, y: useAnchor.y() })
    } else {
      const p1 = getPoint2D(this.anchor1)
      const p2 = getPoint2D(this.anchor2)
      const p3 = new Point2D((p1.x + p2.x) / 2, (p1.y + p2.y) / 2)
      const from = [p1, p2, p3]

      connectedObject(this.textField, from, this.dashLine)
    }

    this.textField.text(len)

    this.getLayer().batchDraw()
  }

  _dragText() {
    this.textDragged = true
    // 判断是否存在虚线
    this.dashLine = this.dashLine || this.findOne('#dashLine')
    if (!this.dashLine) {
      this.dashLine = new Line({
        stroke: Color.ITEM_NORMAL,
        strokeWidth: 2,
        lineJoin: 'round',
        dash: [6, 3],
        id: 'dashLine',
        name: 'node-dashline'
      })

      this.add(this.dashLine)
    }

    const p1 = getPoint2D(this.anchor1)
    const p2 = getPoint2D(this.anchor2)
    const p3 = new Point2D((p1.x + p2.x) / 2, (p1.y + p2.y) / 2)
    const from = [p1, p2, p3]
    connectedObject(this.textField, from, this.dashLine)
    this.getLayer().batchDraw()
  }

  _dragMove() {
    // const mouse = getRelativePointerPosition(this.getStage())
    // console.log(mouse)
  }
}

export default Length
