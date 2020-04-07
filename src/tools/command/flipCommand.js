/**
 *
 * Created Date: 2020-03-11, 23:38:11 (zhenliang.sun)
 * Last Modified: 2020-04-07, 22:08:10 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

import RotateCommand from './rotateCommand'

/**
 * 水平翻转、基于当前角度进行180°翻转
 * 如，当前已经旋转90°，翻转后，应该是180°+90°
 *
 * @class FlipCommand
 * @extends {RotateCommand}
 * @author zhenliang.sun
 */
class FlipCommand extends RotateCommand {
  constructor() {
    super()
    this._type = 'FlipCommand'
  }

  execute() {
    super.execute()
    // 基于当前角度增加180° 派发出去
  }
}

export default FlipCommand
