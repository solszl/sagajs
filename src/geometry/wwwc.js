/**
 *
 * Created Date: 2020-02-02, 23:49:58 (zhenliang.sun)
 * Last Modified: 2020-02-02, 23:51:45 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

export default class WWWC {
  constructor(center, width) {
    this._center = center
    this._width = width
  }

  equals(item) {
    return !!item && item.center === this.center && item.width === this.width
  }

  get center() {
    return this._center
  }

  get width() {
    return this._width
  }
}
