/**
 *
 * Created Date: 2020-03-25, 11:26:54 (zhenliang.sun)
 * Last Modified: 2020-04-02, 15:41:07 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

import BaseCommand from './baseCommand'
import Konva from 'konva'
import Ellipse from '../shape/ellipse'

/**
 * 椭圆区域CT值
 *
 * @class EllipseCommand
 * @extends {BaseCommand}
 * @author zhenliang.sun
 */
class EllipseCommand extends BaseCommand {
  constructor(container) {
    super(container)
    this._type = 'EllipseCommand'

    Object.assign(this.ee, {
      mousedown: this._mouseDown.bind(this)
    })
  }

  execute() {
    super.execute()
    this.removeEvents()
    this.addEvents()
  }

  _mouseDown(e) {
    if (e.target instanceof Konva.Image) {
      const { spacing } = this.view.image.geometry
      const ellipseItem = new Ellipse(spacing)
      this.stage.findOne('#dynamicGroup').add(ellipseItem)
      ellipseItem.start()
    }
  }
}

export default EllipseCommand
