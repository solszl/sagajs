/**
 *
 * Created Date: 2020-03-16, 16:51:48 (zhenliang.sun)
 * Last Modified: 2020-03-18, 10:39:46 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

import Konva from 'konva'
import log from 'loglevel'
import { getRelativePointerPosition } from './../command/utils'
import { Color } from './theme'
import { createTextComponent, connectedObject } from './utils'

/**
 * 长度测量工具
 * 2个圆，1个线，一个文案，一个虚线连接
 *
 * @class Length
 * @extends {Konva.Group}
 */
class Length extends Konva.Group {
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

    this.text = null
  }

  start() {
    // 给stage绑定事件
    for (const event in this.ee) {
      this.getStage().on(event, this.ee[event])
    }

    const mouse = getRelativePointerPosition(this.getStage())
    this.anchor1 = new Konva.Circle({
      fill: 'rgba(0,0,0,0.1)',
      stroke: Color.ANCHOR_NORMAL,
      strokeWidth: 2,
      radius: 4,
      hitStrokeWidth: 16,
      draggable: true
    })

    this.add(this.anchor1)
    this.position(mouse)
    this.anchor1.position({ x: 0, y: 0 })

    this.anchor2 = new Konva.Circle({
      fill: 'rgba(0,0,0,0.1)',
      stroke: Color.ANCHOR_NORMAL,
      strokeWidth: 2,
      radius: 4,
      hitStrokeWidth: 16,
      draggable: true
    })
    this.add(this.anchor2)
    this.anchor2.position({ x: 0, y: 0 })

    this.line = new Konva.Line({
      stroke: Color.ITEM_NORMAL,
      hitStrokeWidth: 20
    })
    this.line.moveToBottom()
    this.add(this.line)

    this.text = createTextComponent()
    this.text.draggable(true)
    this.add(this.text)

    this.draggable(true)

    this.draw()
    ;[this.anchor1, this.anchor2].forEach(anchor => {
      anchor.on('dragmove', this._dragMove.bind(this))
    })

    this.text.on('dragmove', this._dragText.bind(this))

    this.on('mouseover', () => {
      this.getStage().container().style.cursor = 'pointer'
    })
    this.on('mouseout', () => {
      this.getStage().container().style.cursor = 'auto'
    })
  }

  _mouseMove(e) {
    const mouse = getRelativePointerPosition(this.getStage())
    const position = { x: mouse.x - this.x(), y: mouse.y - this.y() }
    this.anchor2.position(position)

    this._dragMove()
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

  _dragMove() {
    const x1 = this.anchor1.x()
    const y1 = this.anchor1.y()
    const x2 = this.anchor2.x()
    const y2 = this.anchor2.y()
    const points = [x1, y1, x2, y2]
    this.line.points(points)

    const distance = Math.sqrt((x2 - x1) ** 2, (y2 - y1) ** 2)
    const len = (distance * this.spacing.rowSpacing).toFixed(2) + 'mm'
    this.text.position({ x: x2 + 10, y: y2 })
    this.text.text(len)

    this.getLayer().batchDraw()
  }

  _dragText() {
    connectedObject(this.line, this.text)
    this.getStage().batchDraw()
  }
}

export default Length
