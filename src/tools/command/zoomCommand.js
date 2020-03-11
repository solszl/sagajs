/**
 *
 * Created Date: 2020-03-12, 00:00:55 (zhenliang.sun)
 * Last Modified: 2020-03-12, 00:06:57 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

import BaseCommand from './baseCommand'

/**
 * 缩放功能、基于当前舞台的位置进行缩放
 *
 * @class ZoomCommand
 * @extends {BaseCommand}
 * @author zhenliang.sun
 */
class ZoomCommand extends BaseCommand {
  constructor(stage) {
    super(stage)
    this._type = 'ZoomCommand'
  }

  execute() {
    super.execute()
    // 获取当前舞台位置进行缩放操作
  }
}

export default ZoomCommand
