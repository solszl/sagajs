import log from 'loglevel'
/**
 *
 * Created Date: 2020-03-10, 00:32:15 (zhenliang.sun)
 * Last Modified: 2020-04-07, 21:44:26 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

/**
 * 命令基类
 *
 * @class BaseCommand
 * @author zhenliang.sun
 */
class BaseCommand {
  constructor(container) {
    const { stage, view } = container
    this.stage = stage
    this.view = view
    this.ee = {
      wheel: this._mouseWheel.bind(this).throttle(30)
    }
    this._type = 'BaseCommand'
  }

  execute() {
    if (this.stage === null) {
      log.error('stage is null')
      return false
    }
  }

  addEvents() {
    // 给stage绑定事件
    for (const event in this.ee) {
      this.stage.on(event, this.ee[event])
    }
  }

  removeEvents() {
    for (const event in this.ee) {
      this.stage.off(event, this.ee[event])
    }
  }

  rebindEvents() {
    this.removeEvents()
    this.addEvents()
  }

  _mouseWheel(e) {
    e.evt.preventDefault()
    const sliceIndex = this.view.sliceIndex.clone()
    sliceIndex.k += Math.sign(e.evt.deltaY)
    this.view.sliceIndex = sliceIndex
  }

  /**
   * 获取当前命令的名字
   *
   * @readonly
   * @memberof BaseCommand
   */
  get type() {
    return this._type
  }
}

export default BaseCommand
