/**
 *
 * Created Date: 2020-02-04, 23:24:17 (zhenliang.sun)
 * Last Modified: 2020-02-16, 03:23:05 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

/**
 * 填充偏移量
 *
 * @export
 * @class Rescale
 */
export default class Rescale {
  constructor(rsi, bitsStored = 12) {
    this.rsi = rsi
    this.lut = null
    this.length = 2 ** bitsStored
    this._initialize()
  }

  _initialize() {
    this.lut = new Float32Array(this.length)
    for (let i = 0; i < this.length; i += 1) {
      this.lut[i] = this.rsi.apply(i)
    }
  }

  getValue(offset) {
    return this.lut[offset]
  }
}
