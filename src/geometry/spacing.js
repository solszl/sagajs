/**
 *
 * Created Date: 2020-01-31, 22:36:23 (zhenliang.sun)
 * Last Modified: 2020-01-31, 22:41:03 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */
/**
 *
 *
 * @export
 * @class Spacing
 * @author zhenliang.sun
 */
export default class Spacing {
  constructor(columnSpacing, rowSpacing, sliceSpacing) {
    this._column = columnSpacing
    this._row = rowSpacing
    this._slice = sliceSpacing
  }

  equals(item) {
    return (
      !!item &&
      this.columnSpacing === item.columnSpacing &&
      this.rowSpacing === item.rowSpacing &&
      this.sliceSpacing === item.sliceSpacing
    )
  }

  get columnSpacing() {
    return this._column
  }

  get rowSpacing() {
    return this._row
  }

  get sliceSpacing() {
    return this._slice
  }
}
