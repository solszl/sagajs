import log from 'loglevel'
/**
 *
 * Created Date: 2020-03-10, 00:32:15 (zhenliang.sun)
 * Last Modified: 2020-03-10, 00:54:47 (zhenliang.sun)
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
  constructor(stage) {
    this.stage = stage
    this._type = 'BaseCommand'
  }

  execute() {
    if (this.stage === null) {
      log.error('stage is null')
      return false
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
