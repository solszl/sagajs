/**
 *
 * Created Date: 2020-01-31, 03:13:05 (zhenliang.sun)
 * Last Modified: 2020-01-31, 03:54:57 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

export default class Point3D {
  constructor(x, y, z) {
    this._x = x
    this._y = y
    this._z = z
  }

  equals(to) {
    return !!to && to.x === this.x && to.y === this.y && to.z === this.z
  }

  distance(to) {
    // 欧氏距离定义
    // d=sqrt( ∑(xi1-xi2)^ ) 这里i=1,2..n
    const pow = (x, p) => x ** p
    const x = this.x - to.x
    const y = this.y - to.y
    const z = this.z - to.z
    return pow(pow(x, 2) + pow(y, 2) + pow(z, 2), 0.5)
  }

  get x() {
    return this._x
  }

  get y() {
    return this._y
  }

  get z() {
    return this._z
  }
}
