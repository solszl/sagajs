/**
 *
 * Created Date: 2020-03-14, 21:13:03 (zhenliang.sun)
 * Last Modified: 2020-03-14, 21:42:00 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

import Konva from 'konva'

export function createTextComponent(text) {
  const t = new Konva.Text({
    text,
    fontSize: 12,
    fill: '#FF000',
    shadowColor: 'black',
    shadowBlur: 10,
    shadowOffsetX: 10,
    shadowOffsetY: 10,
    shadowOpacity: 0.2,
    cornerRadius: 10
  })

  return t
}
