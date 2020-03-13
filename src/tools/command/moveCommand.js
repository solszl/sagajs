import BaseCommand from './baseCommand'
import { INTERNAL_EVENT_ENUM } from '../../constants/internal-event'

/**
 *
 * Created Date: 2020-03-10, 00:40:58 (zhenliang.sun)
 * Last Modified: 2020-03-14, 07:27:48 (zhenliang.sun)
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
  constructor(stage) {
    super(stage)
    this._type = 'MoveCommand'
    this.ee = {
      mouseup: this._mouseUp.bind(this)
    }

    this._isDown = false
  }

  execute() {
    super.execute()

    // 给stage绑定事件
    for (const event in this.ee) {
      this.stage.on(event, this.ee[event])
    }

    this.stage.draggable(true)
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
