/**
 *
 * Created Date: 2020-03-30, 14:33:06 (zhenliang.sun)
 * Last Modified: 2020-03-30, 19:07:07 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

import log from 'loglevel'
import BaseCommand from './baseCommand'

/**
 * 快速滚动
 *
 * @class ScrollCommand
 * @extends {BaseCommand}
 * @author zhenliang.sun
 */
class ScrollCommand extends BaseCommand {
  constructor(container) {
    super(container)

    this._type = 'ScrollCommand'
    this.ee = {
      mousedown: this._mouseDown.bind(this),
      mousemove: this._mouseMove.bind(this).throttle(50),
      mouseup: this._mouseUp.bind(this),
      mouseleave: this._mouseUp.bind(this),
      wheel: this._mouseWheel.bind(this).throttle(50)
    }

    this._isMouseDown = false
    this.mouseY = 0
  }

  execute() {
    super.execute()
    this.removeEvents()
    this.addEvents()
  }

  _mouseDown(e) {
    this._isMouseDown = true
    this.mouseY = e.evt.clientY
  }

  _mouseMove(e) {
    if (this._isMouseDown === false) {
      return
    }

    const currentMouseY = e.evt.clientY
    const deltaY = currentMouseY - this.mouseY
    if (deltaY !== 0) {
      const pageOffset = Math.sign(deltaY)

      const sliceIndex = this.view.sliceIndex.clone()
      sliceIndex.k += pageOffset
      this.view.sliceIndex = sliceIndex
      this.mouseY = currentMouseY
    }
  }

  _mouseUp(e) {
    this._isMouseDown = false
  }

  _mouseWheel(e) {
    e.evt.preventDefault()
    const sliceIndex = this.view.sliceIndex.clone()
    sliceIndex.k += Math.sign(e.evt.deltaY)
    this.view.sliceIndex = sliceIndex
  }
}

export default ScrollCommand
