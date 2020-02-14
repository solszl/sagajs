/**
 *
 * Created Date: 2020-02-14, 01:34:18 (zhenliang.sun)
 * Last Modified: 2020-02-15, 01:55:48 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

/** 普通常规颜色 */
export const NORMAL = {}

/** 反色 */
export const INVERSE = {}

/** 伪彩 */
export const RAINBOW = {}

class ColourMap {
  constructor() {
    this._colour = null

    this._min = 0
    this._max = 255
    this.colours = {
      normal: {},
      inverse: {},
      rainbow: {}
    }
  }

  setRange(min = 0, max = 255) {
    this._min = min
    this._max = max
  }

  buildLut(func) {
    const lut = []
    for (let i = 0; i < this._max; i += 1) {
      lut.push(func(i))
    }

    return lut
  }

  normalId(i) {
    return i
  }

  inverseId(i) {
    return this._max - i
  }

  set colour(name) {
    const normalId = i => i
    const inverseId = i => this._max - i
    switch (name.toLowerCase()) {
      case 'normal':
        this._colour = this.colours.normal

        this._colour.red = this.buildLut(normalId)
        this._colour.green = this.buildLut(normalId)
        this._colour.blue = this.buildLut(normalId)
        break
      case 'inverse':
        this._colour = this.colours.inverse
        this._colour.red = this.buildLut(inverseId)
        this._colour.green = this.buildLut(inverseId)
        this._colour.blue = this.buildLut(inverseId)
        break
      case 'rainbow':
        this._colour = this.colours.rainbow
        break
      default:
        this._colour = this.colours.normal
        break
    }
  }

  get colour() {
    return this._colour
  }
}

export default ColourMap
