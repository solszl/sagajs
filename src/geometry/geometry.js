/**
 *
 * Created Date: 2020-01-31, 15:57:44 (zhenliang.sun)
 * Last Modified: 2020-01-31, 20:16:39 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

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

  localToGlobal(index3d) {}

  globalToLocal(point3d) {}
}
