/**

 *
 * Created Date: 2020-03-14, 13:21:31 (zhenliang.sun)
 * Last Modified: 2020-03-14, 14:35:59 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */
import BaseCommand from './baseCommand'
import { INTERNAL_EVENT_ENUM } from '../../constants/internal-event'
/**
 * 窗宽窗位
 * 派发deltaWindowWidth、deltaWindowCenter
 *
 * @class WWWCCommand
 * @extends {BaseCommand}
 * @author zhenliang.sun
 */
class WWWCCommand extends BaseCommand {
  constructor(stage) {
    super(stage)

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

    this.stage.draggable(false)
  }

  _mouseDown(e) {
    this._isDown = true
    this.mouse = { x: e.evt.pageX, y: e.evt.pageY }
  }

  _mouseMove(e) {
    if (this._isDown === false) {
      return
    }

    const { x, y } = this.mouse
    const deltaX = e.evt.pageX - x
    const deltaY = e.evt.pageY - y

    if (deltaX !== 0 || deltaY !== 0) {
      const deltaWWWC = {
        width: deltaX,
        center: deltaY
      }
      this.stage.fire(INTERNAL_EVENT_ENUM.WWWC_CHANGE, { deltaWWWC })
    }

    this.mouse = { x: e.evt.pageX, y: e.evt.pageY }
  }

  _mouseUp(e) {
    this._isDown = false
  }
}

export default WWWCCommand
