/**
 *
 * Created Date: 2020-05-05, 01:49:24 (zhenliang.sun)
 * Last Modified: 2020-05-05, 02:37:53 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

import IEvent from '../../src/component/event'

class MPR extends IEvent {
  constructor() {
    super()
  }

  /**
   * 1）根据 x、y、z、旋转角度pitch、yaw、roll求出旋转矩阵 matrix
   * 2）根据w、h、l求出旋转后的newWidth、newHeight
   * 3）双重循环newWidth、newHeight， 根据矩阵matrix 反推原始坐标ox、oy、oz
   * 4）根据ox、oy、oz的坐标取值填充给数据对象实现图像充
   *
   * via:
   *  1) pitch、yaw、roll是什么意思
   *      https://blog.csdn.net/yuzhongchun/article/details/22749521
   *  2） 如何根据x、y、z以及pitch、yaw、roll 求得旋转矩阵
   *
   * @param {*} x 围绕点的横坐标
   * @param {*} y 围绕点的纵坐标
   * @param {*} z 围绕点的深度坐标
   * @param {*} pitch x轴的旋转角度
   * @param {*} yaw y轴的旋转角度
   * @param {*} roll z轴的旋转角度
   * @param {*} w 图像的宽度边界（通常512）
   * @param {*} h 图像的高度边界（通常512）
   * @param {*} l 图像的深度边界（通常图像的层数）
   * @param {*} sx x轴横向spacing
   * @param {*} sy y轴纵向spacing
   * @param {*} sy z轴深度的spacingBetweenSlice
   * @memberof MPR
   */
  getRotateMatrix(x, y, z, pitch, yaw, roll, w, h, l, sx, sy, sz) {}
}

export default MPR
