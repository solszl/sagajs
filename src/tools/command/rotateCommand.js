/**
 *
 * Created Date: 2020-03-11, 23:25:45 (zhenliang.sun)
 * Last Modified: 2020-04-07, 22:08:09 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

import BaseCommand from './baseCommand'

/**
 * 任意角度旋转
 * 旋转的时候，位置不发生变化
 *
 * @class RotateCommand
 * @extends {BaseCommand}
 * @author zhenliang.sun
 */
class RotateCommand extends BaseCommand {
  constructor() {
    super()
    this._type = 'RotateCommand'
    this._angle = 0
  }

  execute() {
    super.execute()
    // 监听舞台的拖放事件来控制旋转
  }
}

export default RotateCommand
