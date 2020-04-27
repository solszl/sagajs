/**
 *
 * Created Date: 2020-04-27, 16:48:08 (zhenliang.sun)
 * Last Modified: 2020-04-27, 16:55:11 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

import { Group } from 'konva/lib/Group'
import { Line } from 'konva/lib/shapes/Line'
class ReferenceLine extends Group {
  constructor(color1, color2) {
    super()

    this.line1 = this._createReferenceLine(color1, this)
    this.line2 = this._createReferenceLine(color2, this)
  }

  _createReferenceLine(color, parent) {
    const line = new Line({
      strokeWidth: 2,
      lineCap: 'round',
      lineJoin: 'round',
      hitStrokeWidth: 20,
      stroke: color,
      draggable: true,
      x: 0,
      y: 0
    })

    if (parent) {
      parent.add(line)
    }

    return line
  }
}

export default ReferenceLine
