import BaseCommand from './baseCommand'
import { INTERNAL_EVENT_ENUM } from '../../constants/internal-event'

/**
 *
 * Created Date: 2020-03-10, 00:40:58 (zhenliang.sun)
 * Last Modified: 2020-03-10, 01:24:05 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

class MoveCommand extends BaseCommand {
  constructor(stage) {
    super(stage)
    this._type = 'MoveCommand'
    this.ee = {
      mousedown: this._mouseDown.bind(this),
      mousemove: this._mouseMove.bind(this),
      mouseup: this._mouseUp.bind(this),
      mouseleave: this._mouseUp.bind(this)
    }

    this._isDown = false

    this.mouse = { x: 0, y: 0 }
  }

  execute() {
    super.execute()

    // 给stage绑定事件
    for (const event in this.ee) {
      this.stage.on(event, this.ee[event])
    }
  }

  _mouseDown(e) {
    this._isDown = true
    this.mouse = this.stage.getPointerPosition()
  }

  _mouseMove(e) {
    if (this._isDown === false) {
      return
    }

    const pointer = this.stage.getPointerPosition()
    const { x, y } = pointer
    const { x: oldX, y: oldY } = this.mouse
    const deltaX = x - oldX
    const deltaY = y - oldY

    // 只有X或者Y有变化再派发事件出去
    if (deltaX !== 0 || deltaY !== 0) {
      this.mouse = pointer
      this.stage.fire(INTERNAL_EVENT_ENUM.POSITION_CHANGE, {
        x: deltaX,
        y: deltaY
      })
    }
  }

  _mouseUp(e) {
    this._isDown = false
    this.mouse = { x: 0, y: 0 }
  }
}

export default MoveCommand
