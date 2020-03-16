/**
 *
 * Created Date: 2020-03-14, 21:13:03 (zhenliang.sun)
 * Last Modified: 2020-03-16, 10:55:06 (zhenliang.sun)
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
    shadowBlur: 2,
    shadowOffsetX: 1,
    shadowOffsetY: 1,
    shadowOpacity: 0.5,
    cornerRadius: 10
  })

  return t
}

export const PI = 3.1415926
