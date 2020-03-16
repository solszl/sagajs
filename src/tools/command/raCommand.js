/**
 *
 * Created Date: 2020-03-11, 23:36:45 (zhenliang.sun)
 * Last Modified: 2020-03-16, 11:08:58 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

import RotateCommand from './rotateCommand'

/**
 * 直角顺时针旋转 (Right Angle)
 *
 * @class RACommand
 * @extends {RotateCommand}
 * @author zhenliang.sun
 */
class RACommand extends RotateCommand {
  constructor(container) {
    super(container)
    this._type = 'RACommand'
  }

  execute() {
    super.execute()
    // 直接派发旋转 90°

    this.stage.rotate(30)

    if(this.stage.rotation() % 360 === 0) {
      this.stage.rotation(0)
    }
    // this.stage.rotation(30)
    this.stage.draw()
  }
}

export default RACommand
