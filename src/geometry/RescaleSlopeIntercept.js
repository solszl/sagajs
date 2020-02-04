/**
 *
 * Created Date: 2020-02-02, 15:28:20 (zhenliang.sun)
 * Last Modified: 2020-02-05, 00:56:59 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

export default class RescaleSlopeIntercept {
  constructor(slope = 1, intercept = 0) {
    this._slope = slope
    this._intercept = intercept
  }

  equals(item) {
    return (
      !item && item.slope === this.slope && item.intercept === this.intercept
    )
  }

  apply(value) {
    return value * this.slope + this.intercept
  }

  get slope() {
    return this._slope
  }

  get intercept() {
    return this._intercept
  }
}
