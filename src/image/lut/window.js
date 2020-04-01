/**
 *
 * Created Date: 2020-02-16, 01:27:11 (zhenliang.sun)
 * Last Modified: 2020-04-01, 17:48:39 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

class W {
  constructor(rescaleLut, pixelRepresentation) {
    this.rescaleLut = rescaleLut
    this.signed = pixelRepresentation === 1

    this.lut = null
    this.signedShift = 0
  }

  setWWWC(wwwc) {
    if (this.wwwc && this.wwwc.equals(wwwc)) {
      return
    }

    this.wwwc = wwwc
    if (this.signed) {
      const size = this.rescaleLut.length
      this.signedShift = size >> 1
      this.wwwc.offset = this.rescaleLut.rsi.slope * this.signedShift
    }

    this.update()
  }

  update() {
    const length = this.rescaleLut.length
    if (!this.lut) {
      this.lut = new Uint8ClampedArray(length)
    }

    for (let i = 0; i < length; i += 1) {
      this.lut[i] = this.wwwc.apply(this.rescaleLut.getValue(i))
    }
  }

  getValue(offset) {
    return this.lut[offset + this.signedShift]
  }

  destroy() {
    this.rescaleLut.destroy()
    this.rescaleLut = null
    this.lut = null
    this.wwwc = null
  }
}

export default W
