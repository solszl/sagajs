import Vector3D from './Vector3D'

/**
 *
 * Created Date: 2020-02-02, 03:36:32 (zhenliang.sun)
 * Last Modified: 2020-02-02, 04:10:09 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

Number.PRECISION = Math.pow(2, -52)

/**
 * m00, m01, m02
 * m10, m11, m12
 * m20, m21, m22
 *
 * @export
 * @class Matrix33
 */
export default class Matrix33 {
  constructor(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
    var mat = new Float32Array(9)
    mat[0] = m00
    mat[1] = m01
    mat[2] = m02
    mat[3] = m10
    mat[4] = m11
    mat[5] = m12
    mat[6] = m20
    mat[7] = m21
    mat[8] = m22
    this._mat = mat
  }

  get(row, col) {
    return this.mat[row * 3 + col]
  }

  multiply(vector3d) {
    const m00 = this.get(0, 0)
    const m01 = this.get(0, 1)
    const m02 = this.get(0, 2)
    const m10 = this.get(1, 0)
    const m11 = this.get(1, 1)
    const m12 = this.get(1, 2)
    const m20 = this.get(2, 0)
    const m21 = this.get(2, 1)
    const m22 = this.get(2, 2)

    const vx = vector3d.x
    const vy = vector3d.y
    const vz = vector3d.z

    const fn = (a, b, c) => {
      return a * vx + b * vy + c * vz
    }

    return new Vector3D(fn(m00, m01, m02), fn(m10, m11, m12), fn(m20, m21, m22))
  }

  equals(item) {
    const sub = (x, y) => {
      return Math.abs(this.get(x, y) - item.get(x, y)) < Number.PRECISION
    }
    return (
      !!item &&
      sub(0, 0) &&
      sub(0, 1) &&
      sub(0, 2) &&
      sub(1, 0) &&
      sub(1, 1) &&
      sub(1, 2) &&
      sub(2, 0) &&
      sub(2, 1) &&
      sub(2, 2)
    )
  }

  identity() {
    return new Matrix33(1, 0, 0, 0, 1, 0, 0, 0, 1)
  }
}
