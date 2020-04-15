/**
 *
 * Created Date: 2020-01-31, 15:57:44 (zhenliang.sun)
 * Last Modified: 2020-04-15, 22:52:30 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

import Point3D from './point3D'

/**
 * 几何坐标系，所有空间轮转换算就是在这里进行的
 *
 * @export
 * @class Geometry
 * @author zhenliang.sun
 */
export default class Geometry {
  constructor(origin, spacing, size, orientation) {
    this.origins = [origin]
    this.origin = origin
    this.spacing = spacing
    this.size = size
    this.orientation = orientation
  }

  /**
   * 添加origin到制定层
   *
   * @param {*} origin
   * @param {*} index
   * @memberof Geometry
   */
  appendOrigin(origin, index) {
    this.origins.splice(index, 0, origin)
  }

  /**
   * 物理坐标转换为本地坐标
   * via: https://www.researchgate.net/post/How_to_create_a_simple_project_to_convert_DICOM_images_to_3d_images
   * Conversion from 3D to 2D
   * Difference = Voxel – Image plane Pos;
   * Difference_in_X = Difference.Innerproduct(Row vector)
   * Difference_in_Y = Difference.Innerproduct(Col vector)
   * 2D Point = (Difference_in_X/pixel size in X, Difference_in_Y/pixel size in Y)
   *
   * @param {*} x
   * @param {*} y
   * @param {*} z
   * @memberof Geometry
   */
  globalToLocal(x, y, z) {
    const vector3d = new Point3D(x, y, z).subtract(this.origin)
    const { rowVector, columnVector } = this.orientation
    const { columnSpacing: spX, rowSpacing: spY } = this.spacing

    const diffInX = vector3d.dotProduct(rowVector)
    const diffInY = vector3d.dotProduct(columnVector)
    return [diffInX / spX, diffInY / spY]
  }

  /**
   * 本地坐标转换为物理坐标
   * via: https://www.researchgate.net/post/How_to_create_a_simple_project_to_convert_DICOM_images_to_3d_images
   * Conversion from 2D to 3D
   * Voxel (x, y, z) = Image Plane Position + Row change in X + column change in Y
   * Where Row change in X = Row vector * Pixel size in X direction * 2D Point location in X direction
   * Column change in Y = Column vector * Pixel size in Y direction * 2D Point location in Y direction
   *
   * eg:
   * a) 2d point = (5, 6)
   * b) orientation = [1,0,0,0,1,0] => {
   *      row vector = [1,0,0]
   *      column vector = [0,1,0]
   *    }
   * c) origin = (100,100,50)
   * d) pixel spacing = (0.5, 0.5)
   *
   * Voxel(x,y,z) = (100,100,50) + (1,0,0) * 0.5 * 5 + (0,1,0) * 0.5 * 6
   *              = (100,100,50) + (2.5,0,0) + (0,3,0)
   *              = (102.5, 103, 50)
   *
   * @param {*} x
   * @param {*} y
   * @memberof Geometry
   */
  localToGlobal(x, y) {
    const { x: ox, y: oy, z: oz } = this.origin
    const { columnSpacing: spX, rowSpacing: spY } = this.spacing
    const { rowVector, columnVector } = this.orientation

    const r = rowVector.multiply(spX * x)
    const c = columnVector.multiply(spY * y)

    const rx = ox + r.x + c.x
    const ry = oy + r.y + c.y
    const rz = oz + r.z + c.z
    return [rx, ry, rz]
  }
}
