/**
 *
 * Created Date: 2020-03-14, 14:51:55 (zhenliang.sun)
 * Last Modified: 2020-04-07, 21:49:13 (zhenliang.sun)
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
  constructor(container, config = { tooltip: 'CT: {ct}' }) {
    super(container)

    this.config = config

    Object.assign(this.ee, {
      mousedown: this._mouseDown.bind(this),
      mousemove: this._mouseMove.bind(this),
      mouseup: this._mouseUp.bind(this),
      mouseleave: this._mouseUp.bind(this)
    })

    this._isDown = false
    this._type = 'ProbeCommand'

    this.probeItem = new Probe({}, config.tooltip)
  }

  execute() {
    super.execute()

    this.rebindEvents()
  }

  _mouseDown(e) {
    this._isDown = true

    // 获取group
    const group = this.stage.findOne('#dynamicGroup')

    const { x, y } = getRelativePointerPosition(this.stage, true)
    const ct = this.view.getRescaleValue(x, y)
    group.add(this.probeItem)

    this.probeItem.value(ct)
    this.probeItem.position({ x, y })

    group.draw()
  }

  _mouseMove(e) {
    if (this._isDown === false) {
      return
    }

    const { x, y } = getRelativePointerPosition(this.stage, true)
    const ct = this.view.getRescaleValue(x, y)

    // 计算CT值
    this.probeItem.value(ct)
    this.probeItem.position({ x, y })
    this.stage.findOne('#dynamicGroup').draw()
  }

  _mouseUp(e) {
    this._isDown = false
    this.probeItem.remove()
    this.stage.findOne('#dynamicGroup').draw()
  }
}

export default ProbeCommand
