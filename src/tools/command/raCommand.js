/**
 *
 * Created Date: 2020-03-11, 23:36:45 (zhenliang.sun)
 * Last Modified: 2020-03-11, 23:54:39 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

import RotateCommand from './rotateCommand'

/**
 * 直角顺时针旋转
 *
 * @class RACommand
 * @extends {RotateCommand}
 * @author zhenliang.sun
 */
class RACommand extends RotateCommand {
  constructor(stage) {
    super(stage)
    this._type = 'RACommand'
  }

  execute() {
    super.execute()
    // 直接派发旋转 90°
  }
}

export default RACommand
