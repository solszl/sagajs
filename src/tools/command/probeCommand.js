/**
 *
 * Created Date: 2020-03-14, 14:51:55 (zhenliang.sun)
 * Last Modified: 2020-03-14, 16:37:32 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

import BaseCommand from './baseCommand'
import Probe from '../shape/probe'
import { getRelativePointerPosition } from './utils/index'

/**
 * 探针工具
 *
 * @class ProbeCommand
 * @extends {BaseCommand}
 * @author zhenliang.sun
 */
class ProbeCommand extends BaseCommand {
  constructor(container, config = { tooltip: 'CT:{ct}' }) {
    super(container)

    this.config = config

    this.ee = {
      mousedown: this._mouseDown.bind(this),
      mousemove: this._mouseMove.bind(this),
      mouseup: this._mouseUp.bind(this),
      mouseleave: this._mouseUp.bind(this)
    }

    this._isDown = false
    this._type = 'ProbeCommand'

    this.probeItem = new Probe(config.tooltip)
  }

  execute() {
    super.execute()

    // 给stage绑定事件
    for (const event in this.ee) {
      this.stage.on(event, this.ee[event])
    }
  }

  _mouseDown(e) {
    this._isDown = true

    const mouse = getRelativePointerPosition(this.stage)
  }

  _mouseMove(e) {
    if (this._isDown === false) {
      return
    }

    const mouse = getRelativePointerPosition(this.stage)

    // 计算CT值
    this.probeItem.value((Math.random() * 300) >> 1)
    this.probeItem.position({ x: 100, y: 200 })
  }

  _mouseUp(e) {
    this._isDown = false
  }
}

export default ProbeCommand
