/**
 *
 * Created Date: 2020-03-14, 15:03:22 (zhenliang.sun)
 * Last Modified: 2020-03-14, 21:47:39 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

import { createTextComponent } from './utils'
import Konva from 'konva'

class Probe extends Konva.Group {
  constructor(cfg, tooltipTpl) {
    super(cfg)
    this.tooltipTpl = tooltipTpl

    this.compText = createTextComponent('')
    this.add(this.compText)
  }

  value(ct) {
    const text = this.tooltipTpl.replace(/{ct}/g, ct)
    this.compText.text(text)

    console.error(text)
  }

  position(pos) {
    super.position({ x: pos.x + 5, y: pos.y + 5 })
  }
}

export default Probe
