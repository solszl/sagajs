/**
 *
 * Created Date: 2020-01-31, 03:11:34 (zhenliang.sun)
 * Last Modified: 2020-01-31, 14:54:38 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

/**
 *
 *
 * @export
 * @class Vector3D
 * @author zhenliang.sun
 */
export default class Vector3D {
  constructor(x, y, z) {
    this._x = x
    this._y = y
    this._z = z
  }

  /**
   * 判断两个向量是否相等
   *
   * @param {*} vector3d
   * @returns
   * @memberof Vector3D
   */
  equals(vector3d) {
    return (
      !!vector3d &&
      this.x === vector3d.x &&
      this.y === vector3d.y &&
      this.z === vector3d.z
    )
  }

  /**
   * 判断叉积是否与2个向量垂直
   * [x1,y1,z1] * [x2,y2,z2] = [y1*z2 - z1*y2, z1*x2 - x1*z2, x1*y2 - x2*y1]
   *
   * @param {*} vector3d
   * @memberof Vector3D
   * @returns 新的差积向量
   */
  crossProduct(vector3d) {
    const x = this.y * vector3d.z - vector3d.y * this.z
    const y = this.z * vector3d.x - vector3d.z * this.x
    const z = this.x * vector3d.y - vector3d.x * this.y
    return new Vector3D(x, y, z)
  }

  /**
   * ∑(ai * bi ) 这里i=1,2..n
   * 点积结果影响两个向量的角度关系
   * a * b > 0 锐角
   * a * b = 0 直角
   * a * b < 0 钝角
   *
   * @param {*} vector3d
   * @memberof Vector3D
   */
  dotProduct(vector3d) {
    return this.x * vector3d.x + this.y * vector3d.y + this.z * vector3d.z
  }

  /**
   * 规范化当前向量
   * normalize 修改当前向量
   * normalized 返回一个新的向量
   *
   * @returns
   * @memberof Vector3D
   */
  normalize() {
    return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2)
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
