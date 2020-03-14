/**
 *
 * Created Date: 2020-03-12, 02:15:08 (zhenliang.sun)
 * Last Modified: 2020-03-14, 15:16:29 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

import BaseCommand from './baseCommand'
import { INTERNAL_EVENT_ENUM } from '../../constants/internal-event'

/**
 * 反色命令， color-map 在normal 和 inverse 互转
 *
 * @class InverseCommand
 * @extends {BaseCommand}
 * @author zhenliang.sun
 */
class InverseCommand extends BaseCommand {
  constructor(container) {
    super(container)
    this._type = 'InverseCommand'
  }

  execute() {
    super.execute()
    this.stage.fire(INTERNAL_EVENT_ENUM.INVERSE_COLOR)
  }
}

export default InverseCommand
