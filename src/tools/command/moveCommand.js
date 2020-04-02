import BaseCommand from './baseCommand'
import { INTERNAL_EVENT_ENUM } from '../../constants/internal-event'

/**
 *
 * Created Date: 2020-03-10, 00:40:58 (zhenliang.sun)
 * Last Modified: 2020-04-02, 15:41:49 (zhenliang.sun)
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
  constructor(container) {
    super(container)
    this._type = 'MoveCommand'
    Object.assign(this.ee, {
      mouseup: this._mouseUp.bind(this)
    })

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
