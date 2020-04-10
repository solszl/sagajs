/**
 *
 * Created Date: 2020-01-31, 03:11:34 (zhenliang.sun)
 * Last Modified: 2020-04-09, 18:13:30 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

/**
 * 向量的操作
 * http://www.waitingfy.com/archives/320
 * https://mp.weixin.qq.com/s/f7RMTgMSFycFM62cWI0bjA
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
   * @returns 新的差积向量(法向量)
   */
  crossProduct(vector3d) {
    const x = this.y * vector3d.z - this.z * vector3d.y
    const y = this.z * vector3d.x - this.x * vector3d.z
    const z = this.x * vector3d.y - this.y * vector3d.x
    return new Vector3D(x, y, z)
  }

  /**
   * ∑(ai * bi ) 这里i=1,2..n
   * 点积结果影响两个向量的角度关系
   * b向量在a向量方向上的投影
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

  toArray() {
    return [this.x, this.y, this.z]
  }

  fromArray(arr) {
    this._x = arr[0]
    this._y = arr[1]
    this._z = arr[2]
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
