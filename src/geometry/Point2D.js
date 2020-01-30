/**
 *
 * Created Date: 2020-01-31, 03:12:56 (zhenliang.sun)
 * Last Modified: 2020-01-31, 03:23:44 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

/**
 * 2D 点类
 *
 * @export
 * @class Point2D
 * @author zhenliang.sun
 */
export default class Point2D {
  constructor(x, y) {
    this._x = x
    this._y = y
  }

  distance(to) {
    // Math.sqrt(a^2 + b^2)
    return ((this.x - to.x) ** 2 + (this.y - to.y) ** 2) ** 0.5
  }

  equals(to) {
    return !!to && to.x === this.x && to.y === this.y
  }

  get x() {
    return this._x
  }

  get y() {
    return this._y
  }
}
