/**
 *
 * Created Date: 2020-03-16, 16:02:20 (zhenliang.sun)
 * Last Modified: 2020-04-02, 15:41:28 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

import Konva from 'konva'
import Length from '../shape/length'
import BaseCommand from './baseCommand'

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

    Object.assign(this.ee, {
      mousedown: this._mouseDown.bind(this)
    })
  }

  execute() {
    super.execute()
    this.removeEvents()
    this.addEvents()
  }

  _mouseDown(e) {
    // 应该判断一下 e.target 是什么，有没有必要添加一个新的长度工具
    if (e.target instanceof Konva.Image) {
      const { spacing } = this.view.image.geometry
      const lengthItem = new Length(spacing)
      this.stage.findOne('#dynamicGroup').add(lengthItem)
      lengthItem.start()
    }
  }
}

export default LengthCommand
