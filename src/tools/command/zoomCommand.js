/**
 *
 * Created Date: 2020-03-12, 00:00:55 (zhenliang.sun)
 * Last Modified: 2020-04-01, 20:57:54 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

import BaseCommand from './baseCommand'
import { INTERNAL_EVENT_ENUM } from '../../constants/internal-event'
const ZOOM_STEP = 0.02
const ZOOM_MIN = 0.1
const ZOOM_MAX = 10

/**
 * 缩放功能、基于当前舞台的位置进行缩放
 * 计算方式： https://konvajs.org/docs/sandbox/Zooming_Relative_To_Pointer.html
 *
 * @class ZoomCommand
 * @extends {BaseCommand}
 * @author zhenliang.sun
 */
class ZoomCommand extends BaseCommand {
  constructor(container) {
    super(container)
    this._type = 'ZoomCommand'
    this.ee = {
      mousedown: this._mouseDown.bind(this),
      mousemove: this._mouseMove.bind(this),
      mouseup: this._mouseUp.bind(this),
      mouseleave: this._mouseUp.bind(this),
      wheel: this._onWheel.bind(this)
    }

    this._isDown = false
    this.mouse = { x: 0, y: 0 }
  }

  execute() {
    super.execute()
    // 获取当前舞台位置进行缩放操作
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

    // 求纵向距离
    const { x: currX, y: currY } = this.stage.getPointerPosition()
    const { y } = this.mouse
    const scale = this.__calcNewScale(Math.sign(currY - y))
    const position = this.__calcNewPosition(scale)

    this.stage.scale({ x: scale, y: scale })
    this.stage.position(position)
    this.stage.batchDraw()
    this.mouse = { x: currX, y: currY }

    this.stage.fire(INTERNAL_EVENT_ENUM.ZOOM_CHANGE, { scale })
    this.stage.fire(INTERNAL_EVENT_ENUM.POSITION_CHANGE, { position })
  }

  _mouseUp(e) {
    this._isDown = false
  }

  _onWheel(e) {
    // 阻止浏览器滚轮默认事件
    e.evt.preventDefault()
    const scale = this.__calcNewScale(Math.sign(e.evt.deltaY))
    const position = this.__calcNewPosition(scale)

    this.stage.scale({ x: scale, y: scale })
    this.stage.position(position)
    this.stage.batchDraw()

    this.stage.fire(INTERNAL_EVENT_ENUM.ZOOM_CHANGE, { scale })
    this.stage.fire(INTERNAL_EVENT_ENUM.POSITION_CHANGE, { position })
  }

  __calcNewScale(signDelta) {
    const oldScale = this.stage.scaleX()
    const newScale = oldScale + signDelta * ZOOM_STEP

    if (newScale > ZOOM_MAX || newScale < ZOOM_MIN) {
      return oldScale
    }

    return newScale
  }

  __calcNewPosition(newScale) {
    const oldScale = this.stage.scaleX()
    // 获取鼠标当前位置
    const mouse = this.stage.getPointerPosition()
    const { stageX, stageY } = {
      stageX: this.stage.x(),
      stageY: this.stage.y()
    }

    const mouseTo = {
      x: mouse.x / oldScale - stageX / oldScale,
      y: mouse.y / oldScale - stageY / oldScale
    }

    const newPosition = {
      x: -(mouseTo.x - mouse.x / newScale) * newScale,
      y: -(mouseTo.y - mouse.y / newScale) * newScale
    }

    return newPosition
  }
}

export default ZoomCommand
