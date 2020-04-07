/**
 *
 * Created Date: 2020-02-03, 00:00:55 (zhenliang.sun)
 * Last Modified: 2020-03-30, 17:53:41 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

export default class Index3D {
  constructor(i, j, k) {
    this.i = i
    this.j = j
    this.k = k
  }

  equals(item) {
    return !!item && item.i === this.i && item.j === this.j && item.k === this.k
  }

  clone() {
    return new Index3D(this.i, this.j, this.k)
  }
}
