/**
 *
 * Created Date: 2020-04-27, 15:53:26 (zhenliang.sun)
 * Last Modified: 2020-04-28, 02:40:29 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

import IEvent from '../../src/component/event'
import Point2D from '../../src/geometry/point2D'

class MPR3D extends IEvent {
  constructor(cfg) {
    super()
    this.config = cfg
    this.x = -1
    this.y = -1
    this.z = -1
    this.a = 0
    this.b = 0
    this.c = 0
  }

  make(x, y, z, a, b, c) {
    this.x = x
    this.y = y
    this.z = z
    this.a = a
    this.b = b
    this.c = c
    // x,矢状位（黄色）， y,冠状位（蓝色），z,轴状位（紫色）
    // a, 轴状位不变，影响冠状位和矢状位旋转角度成像
    // b, 矢状位不变，影响轴状位和冠状位旋转角度成像
    // c, 冠状位不变，影响轴状位和矢状位旋转角度成像
    /*
      针对于
        轴状位： 蓝线动影响冠状位，黄线动影响矢状位，旋转影响冠状位、矢状位
        矢状位： 蓝线动影响冠状位，紫线动影响轴状位，旋转影响冠状位、轴状位
        冠状位： 紫线动影响轴状位，黄线动影响矢状位，旋转影响矢状位、轴状位
    */

    // 轴状位
    this.makeAxisImage()
    // 矢状位
    this.makeSagittalImage()
    // 冠状位
    this.makeCoronalImage()
  }

  /** 轴状位 */
  makeAxisImage() {}

  /** 矢状位 */
  makeSagittalImage() {
    const { spY, spZ } = this.config.spacing
    const { column, row, slice } = this.config.size

    const r1 = this.getIntersectionData(this.x, this.z, this.a, column, slice)
    const r2 = this.getIntersectionData(this.y, this.z, this.c, row, slice)

    console.error('~~~~~~~~~~~')
    console.error(
      `x:${this.x}, y:${this.y}, z:${this.z}, a:${this.a}, b:${this.b}, c:${this.c}`
    )
    console.error('r1', r1.p1.toString(), r1.p2.toString(), r1.angle, r1.length)
    console.error('r2', r2.p1.toString(), r2.p2.toString(), r2.angle, r2.length)
  }

  /** 冠状位 */
  makeCoronalImage() {}

  getIntersectionData(x, y, alpha, width = 512, height = 512) {
    if (alpha === 90 || alpha === 180) {
      return
    }

    let k = 1
    if (alpha % 180 === 0) {
      k = 0
    } else {
      k = Math.tan((alpha / 180) * Math.PI)
    }

    const b = y - k * x // 计算直线与y轴交点。获取直线做方程。 y = k * x + b
    // 分别计算，x = width, x=0, y=height,y=0, 求出各个点
    // y = k * width + b // x=width
    // y = b // x= 0
    // x = (height - b) / k // y = height
    // x = -b / k // y = 0

    const p1 = new Point2D(width, (k * width + b) >> 0)
    const p2 = new Point2D(0, b >> 0)
    const p3 = new Point2D(((height - b) / k) >> 0, height)
    const p4 = new Point2D((-b / k) >> 0, 0)

    const result = [p1, p2, p3, p4].filter(p => {
      return p.x >= 0 && p.x <= width && p.y >= 0 && p.y <= height
    })

    const length = result[0].distance(result[1]) >> 0
    return {
      p1: result[0],
      p2: result[1],
      length,
      angle: ~~alpha
    }
  }
}

export default MPR3D
