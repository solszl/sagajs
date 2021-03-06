/**
 *
 * Created Date: 2020-03-26, 12:04:54 (zhenliang.sun)
 * Last Modified: 2020-04-08, 14:29:18 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

import { Image } from 'konva/lib/shapes/Image'
import log from 'loglevel'
import Angle from '../shape/angle'
import BaseCommand from './baseCommand'

/**
 * 角度测量命令
 *
 * @class AngleCommand
 * @extends {BaseCommand}
 */
class AngleCommand extends BaseCommand {
  constructor() {
    super()

    Object.assign(this.ee, {
      mousedown: this._mouseDown.bind(this)
    })

    this._createItemCompleted = true
  }

  execute() {
    super.execute()
    this.rebindEvents()
  }

  _mouseDown(e) {
    if (e.target instanceof Image) {
      if (this._createItemCompleted === false) {
        return
      }

      this._createItemCompleted = false
      this.removeEvents()

      const { spacing } = this.view.image.geometry
      const angleItem = new Angle(spacing)
      this.stage.findOne('#dynamicGroup').add(angleItem)
      angleItem.start()
      angleItem.on('angle_create_completed', () => {
        log.warn('创建完一个角度')
        this._createItemCompleted = true
        this.addEvents()
      })
    }
  }
}

export default AngleCommand
