import log from 'loglevel'
/**
 *
 * Created Date: 2020-03-10, 00:32:15 (zhenliang.sun)
 * Last Modified: 2020-03-16, 23:06:25 (zhenliang.sun)
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
    this.ee = {}
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
      this.stage.removeEventListener(event, this.ee[event])
    }
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
