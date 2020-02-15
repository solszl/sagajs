/**
 *
 * Created Date: 2020-02-02, 23:49:58 (zhenliang.sun)
 * Last Modified: 2020-02-16, 03:23:42 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

/**
 * 窗宽窗位的计算，计算规则参考
 * http://dicom.nema.org/dicom/2013/output/chtml/part03/sect_C.11.html#sect_C.11.2.1.2
 *
 * @export
 * @class WWWC
 * @author zhenliang.sun
 */
export default class WWWC {
  constructor(width, center) {
    this._center = center
    this._width = width

    this._ymin = 0
    this._ymax = 255

    this._xmin = null
    this._xmax = null

    this._slop = null
    this._intercept = null

    this._offset = 0

    this.init()
  }

  setRange(min = 0, max = 256) {
    this._ymin = min
    this._ymax = max

    this.init()
  }

  equals(item) {
    return !!item && item.center === this.center && item.width === this.width
  }

  init() {
    const c = this.center + this._offset
    this._xmin = c - 0.5 - (this.width - 1) / 2
    this._xmax = c - 0.5 + (this.width - 1) / 2

    this._slop = (this._ymax - this._ymin) / (this.width - 1)
    this._intercept =
      (-(c - 0.5) / (this.width - 1) + 0.5) * (this._ymax - this._ymin) +
      this._ymin
  }

  apply(value) {
    if (value <= this._xmin) {
      return this._ymin
    } else if (value > this._xmax) {
      return this._ymax
    } else {
      // return parseInt(value * this._slop + this._intercept, 10)
      return ~~(value * this._slop + this._intercept) // for performance
    }
  }

  set offset(val) {
    this._offset = val
    this.init()
  }

  get center() {
    return this._center
  }

  get width() {
    return this._width
  }
}
