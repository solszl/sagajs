/**
 *
 * Created Date: 2020-02-04, 23:24:17 (zhenliang.sun)
 * Last Modified: 2020-02-05, 02:00:31 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

/**
 * 重算，将dicom 预设灰度转换成为[0,255] 区间
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
