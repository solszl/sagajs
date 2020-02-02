/**
 *
 * Created Date: 2020-01-31, 22:41:39 (zhenliang.sun)
 * Last Modified: 2020-02-03, 00:50:15 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

export default class Size {
  constructor(columns, rows, slices = 0) {
    this._column = columns
    this._row = rows
    this._slice = slices
  }

  equals(item) {
    return (
      !!item &&
      this.column === item.column &&
      this.row === item.row &&
      this.slice === item.slice
    )
  }

  isInBounds(i, j, k) {
    if (
      i < 0 ||
      i > this.column - 1 ||
      j < 0 ||
      j > this.row - 1 ||
      k < 0 ||
      k > this.slice - 1
    ) {
      return false
    }

    return true
  }

  increaseSlice() {
    this._slice += 1
  }

  get sliceSize() {
    return this.column * this.row
  }

  get totalSize() {
    return this.slice * this.sliceSize
  }

  get column() {
    return this._column
  }

  get row() {
    return this._row
  }

  get slice() {
    return this._slice
  }
}
