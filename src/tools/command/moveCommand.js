import BaseCommand from './baseCommand'
import { INTERNAL_EVENT_ENUM } from '../../constants/internal-event'

/**
 *
 * Created Date: 2020-03-10, 00:40:58 (zhenliang.sun)
 * Last Modified: 2020-04-07, 22:19:05 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

/**
 * 移动工具
 *
 * @class MoveCommand
 * @extends {BaseCommand}
 * @author zhenliang.sun
 */
class MoveCommand extends BaseCommand {
  constructor() {
    super()
    this._type = 'MoveCommand'
    Object.assign(this.ee, {
      mouseup: this._mouseUp.bind(this)
    })

    this._isDown = false
  }

  execute() {
    super.execute()

    this.rebindEvents()

    this.stage.draggable(true)
  }

  removeEvents() {
    super.removeEvents()
    this.stage.draggable(false)
  }

  _mouseUp(e) {
    const position = {
      x: this.stage.x(),
      y: this.stage.y()
    }

    this.stage.fire(INTERNAL_EVENT_ENUM.POSITION_CHANGE, {
      position
    })
  }
}

export default MoveCommand
