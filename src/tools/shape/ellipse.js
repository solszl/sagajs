/**
 *
 * Created Date: 2020-03-25, 16:29:52 (zhenliang.sun)
 * Last Modified: 2020-04-01, 22:00:38 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

import Konva from 'konva'
import log from 'loglevel'
import { getRelativePointerPosition } from '../command/utils'
import BaseShape from './baseShape'
import { Color } from './theme'

/**
 *
 *
 * @class Ellipse
 * @extends {BaseShape}
 * @author zhenliang.sun
 */
class Ellipse extends BaseShape {
  constructor(spacing, cfg = {}) {
    super(cfg)

    this.spacing = spacing

    this._shapeType = 'ellipse'

    this.textDragged = false
    this.textGroup = null

    this.anchor1 = null // 拖拽点1
    this.anchor2 = null // 拖拽点2
    this.ellipse = null // 椭圆
    this.dashLine = null // 连接文本与椭圆的虚线

    this.ee = {
      mousemove: this._mouseMove.bind(this),
      mouseup: this._mouseUp.bind(this)
    }

    // 计算最大、最小、平均、方差、面积 可能较为耗时。节流一下
    this.calcFunction = this._calcTextData.throttle(300)
  }

  start() {
    // 给stage绑定事件
    for (const event in this.ee) {
      this.getStage().on(event, this.ee[event])
    }
    const mouse = getRelativePointerPosition(this.getStage())
    this.position(mouse)

    // 构建UI
    this.anchor1 = this.createAnchor()
    this.add(this.anchor1)
    this.anchor1.position({ x: 0, y: 0 })
    this.anchor1.on('dragmove', this._dragAnchorMove.bind(this).throttle(30))

    this.anchor2 = this.createAnchor()
    this.add(this.anchor2)
    this.anchor2.position({ x: 0, y: 0 })
    this.anchor2.on('dragmove', this._dragAnchorMove.bind(this).throttle(30))

    this.ellipse = new Konva.Ellipse({
      stroke: Color.ITEM_NORMAL,
      strokeWidth: 2,
      hitStrokeWidth: 20,
      name: 'node-item',
      zIndex: 0
    })
    this.add(this.ellipse)

    this.draggable(true)
    this.draw()
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

    log.error(points, this.x(), this.y())

    const width = Math.abs(x2 - x1)
    const height = Math.abs(y2 - y1)
    this.ellipse.size({ width, height })
    this.ellipse.position({
      x: x1 + ((x2 - x1) >> 1),
      y: y1 + ((y2 - y1) >> 1)
    })

    // calc text group value
    this.calcFunction()
    this.getLayer().batchDraw()
  }

  _calcTextData() {
    log.error('计算数值了')
  }
}

export default Ellipse
