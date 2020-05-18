/**
 *
 * Created Date: 2020-03-14, 15:03:22 (zhenliang.sun)
 * Last Modified: 2020-04-08, 12:38:06 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

import { Group } from 'konva/lib/Group'
import { createTextComponent } from './utils'

class Probe extends Group {
  constructor(cfg, tooltipTpl) {
    super(cfg)
    this.tooltipTpl = tooltipTpl

    this.compText = createTextComponent('')
    this.add(this.compText)
  }

  value(ct) {
    const text = this.tooltipTpl.replace(/{ct}/g, ct)
    this.compText.text(text)
  }

  position(pos) {
    super.position({ x: pos.x + 5, y: pos.y + 5 })

    const r = this.getStage().getRotation()
    if (isNaN(r) || r === 0) {
      return
    }

    this.compText.rotation(-30)
  }
}

export default Probe
