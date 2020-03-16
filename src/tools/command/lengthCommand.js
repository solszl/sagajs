/**
 *
 * Created Date: 2020-03-16, 16:02:20 (zhenliang.sun)
 * Last Modified: 2020-03-16, 20:13:55 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

import BaseCommand from './baseCommand'
import Length from '../shape/length'
import log from 'loglevel'

/**
 * 长度测量工具
 *
 * @class LengthCommand
 * @extends {BaseCommand}
 * @author zhenliang
 */
class LengthCommand extends BaseCommand {
  constructor(container) {
    super(container)
    this._type = 'LengthCommand'

    this.ee = {
      mousedown: this._mouseDown.bind(this)
    }
  }

  execute() {
    super.execute()

    // 给stage绑定事件
    for (const event in this.ee) {
      this.stage.on(event, this.ee[event])
    }
  }

  _mouseDown(e) {
    // 应该判断一下 e.target 是什么，有没有必要添加一个新的长度工具
    log.error(e.target)
    const lengthItem = new Length()
    this.stage.findOne('#dynamicGroup').add(lengthItem)
    lengthItem.start()
  }
}

export default LengthCommand
