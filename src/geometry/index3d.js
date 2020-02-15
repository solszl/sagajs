/**
 *
 * Created Date: 2020-02-03, 00:00:55 (zhenliang.sun)
 * Last Modified: 2020-02-03, 00:03:21 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

export default class Index3D {
  constructor(i, j, k) {
    this._i = i
    this._j = j
    this._k = k
  }

  equals(item) {
    return !!item && item.i === this.i && item.j === this.j && item.k === this.k
  }

  get i() {
    return this._i
  }

  get j() {
    return this._j
  }

  get k() {
    return this._k
  }
}
