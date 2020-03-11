import BaseCommand from './baseCommand'
import { INTERNAL_EVENT_ENUM } from '../../constants/internal-event'

/**
 *
 * Created Date: 2020-03-10, 01:29:34 (zhenliang.sun)
 * Last Modified: 2020-03-11, 23:54:16 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

/**
 * 重置命令
 *
 * @class ResetCommand
 * @extends {BaseCommand}
 * @author zhenliang.sun
 */
class ResetCommand extends BaseCommand {
  constructor(stage) {
    super(stage)
    this._type = ResetCommand
  }

  execute() {
    this.stage.fire(INTERNAL_EVENT_ENUM.RESET)
  }
}

export default ResetCommand
