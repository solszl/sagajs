/**
 *
 * Created Date: 2020-03-16, 16:51:48 (zhenliang.sun)
 * Last Modified: 2020-03-16, 20:56:32 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

import Konva from 'konva'
import log from 'loglevel'
import { createAnchor } from './utils'
import { getRelativePointerPosition } from './../command/utils'

/**
 * 长度测量工具
 *
 * @class Length
 * @extends {Konva.Group}
 */
class Length extends Konva.Group {
  constructor(cfg = {}) {
    super(cfg)

    this.ee = {
      mousemove: this._mouseMove.bind(this),
      mouseup: this._mouseUp.bind(this)
    }

    this.anchor1 = null
    this.anchor2 = null

    this.line = null
  }

  start() {
    log.error('添加新工具啦！', this.getStage())

    // 给stage绑定事件
    for (const event in this.ee) {
      this.getStage().on(event, this.ee[event])
    }

    const mouse = getRelativePointerPosition(this.getStage())
    this.anchor1 = createAnchor(4)
    this.add(this.anchor1)
    this.anchor1.position(mouse)

    this.anchor2 = createAnchor(4)
    this.add(this.anchor2)
    this.anchor2.position(mouse)

    this.line = new Konva.Line({
      stroke: 'green'
    })

    this.add(this.line)

    this.draw()
  }

  _mouseMove(e) {
    const mouse = getRelativePointerPosition(this.getStage())
    this.anchor2.position(mouse)

    const points = [this.anchor1.x(), this.anchor1.y(), this.anchor2.x(), this.anchor2.y()]
    this.line.points(points)
    this.getLayer().batchDraw()
  }

  _mouseUp(e) {
    const mouse = getRelativePointerPosition(this.getStage())
    this.anchor2.position(mouse)
    this.getLayer().batchDraw()
  }
}

export default Length
