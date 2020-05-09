/**
 *
 * Created Date: 2020-04-27, 15:53:26 (zhenliang.sun)
 * Last Modified: 2020-05-09, 19:02:27 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

import IEvent from '../../src/component/event'
import Point2D from '../../src/geometry/point2D'
import { mat4, vec3 } from 'gl-matrix'

/** 当做绕多于一个坐标轴的旋转变换时
 *  一般采用Y轴-X轴-Z轴的顺序进行变换
 *  这同日常生活中人们观察物体的习惯顺序相似
 *  先观察两侧(绕Y轴)
 *  再观察上下(绕X轴)
 *  再观察纵深(绕Z轴)。
 */
class MPR3D extends IEvent {
  constructor(cfg) {
    super()
    this.config = cfg
    this.centerX = -1
    this.centerY = -1
    this.centerZ = -1
    this.angleX = 0
    this.angleY = 0
    this.angleZ = 0
  }

  make(centerX, centerY, centerZ, angleX, angleY, angleZ) {
    this.centerX = ~~centerX
    this.centerY = ~~centerY
    this.centerZ = ~~centerZ
    this.angleX = ~~angleX
    this.angleY = ~~angleY
    this.angleZ = ~~angleZ
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
    // this.makeAxisImage()
    // // 矢状位
    this.makeSagittalImage()
    // // 冠状位
    // this.makeCoronalImage()

    // this.test()
  }

  // test() {
  //   const angle = Math.max(this.a % 90, 1)
  //   const m = mat4.create()
  //   const offsetVec = vec3.fromValues(256, 256, 124)
  //   mat4.set(m, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
  //   mat4.translate(m, m, offsetVec)
  //   // mat4.rotateX(m, m, (-45 / 180) * Math.PI)
  //   // mat4.rotateY(m, m, (-45 / 180) * Math.PI)
  //   mat4.rotateZ(m, m, (angle / 180) * Math.PI)
  //   mat4.invert(m, m)
  //   const deg = (angle / 180) * Math.PI
  //   const newRow = (512 / Math.cos(deg)) >> 0
  //   const newColumn = 249
  //   const v3 = vec3.create()
  //   const data = new Array(newColumn * newColumn).fill(0)

  //   const { images } = this.config
  //   for (let i = 0; i < newRow; i++) {
  //     for (let j = 0; j < newColumn; j++) {
  //       const x = i * Math.cos(deg)
  //       const y = j * Math.sin(deg)
  //       vec3.set(v3, x, y, j)
  //       vec3.transformMat4(v3, v3, m)
  //       vec3.add(v3, v3, offsetVec)
  //       if (v3[0] < 512 && v3[1] < 512 && v3[2] > 0 && v3[2] < 249) {
  //         data[i * newRow + j] = images.get(~~v3[2] >> 0)[
  //           ((v3[0] >> 0) * 512 + v3[1]) >> 0
  //         ]
  //       } else {
  //         data[i * newRow + j] = 0
  //       }
  //     }
  //   }

  //   this.emit('render', {
  //     type: 'sagittal',
  //     width: newRow,
  //     height: newColumn,
  //     buffer: data
  //   })
  // }

  /** 轴状位 */
  makeAxisImage() {}

  /** 矢状位 */
  makeSagittalImage() {
    const { spY, spZ } = this.config.spacing

    // const r1 = this.getIntersectionData(this.x, this.z, this.a, column, slice)
    // const r2 = this.getIntersectionData(this.y, this.z, this.c, row, slice)

    // console.error('~~~~~~~~~~~')
    // console.error(
    //   `x:${this.x}, y:${this.y}, z:${this.z}, a:${this.a}, b:${this.b}, c:${this.c}`
    // )
    // console.error('r1', r1.p1.toString(), r1.p2.toString(), r1.angle, r1.length)
    // console.error('r2', r2.p1.toString(), r2.p2.toString(), r2.angle, r2.length)
    const { column, row, slice } = this.config.size
    const { images } = this.config

    let newW = 0
    let newH = 0
    if (this.angleZ < 45) {
      newW = Math.round(slice / Math.cos((this.angleY / 180) * Math.PI))
      newH = Math.round(column / Math.cos((this.angleZ / 180) * Math.PI))
    } else {
      newW = Math.round(slice / Math.cos((this.angleY / 180) * Math.PI))
      newH = Math.round(column / Math.cos(((90 - this.angleZ) / 180) * Math.PI))
    }

    console.log(`newW:${newW}, newH:${newH}, angleZ:${this.angleZ}`)

    const data = new Array(1000 * 1000).fill(0)
    const matrix = mat4.create()
    const offset = vec3.create()
    vec3.set(offset, this.centerX, this.centerY, this.centerZ)
    mat4.translate(matrix, matrix, offset)

    mat4.rotate(matrix, matrix, (this.angleY / 180) * Math.PI, [0, 1, 0])
    mat4.rotate(matrix, matrix, (this.angleX / 180) * Math.PI, [1, 0, 0])

    const vm1 = vec3.fromValues(matrix[0], matrix[1], matrix[2])
    vec3.normalize(vm1, vm1)
    const m1 = vec3.len(vm1)
    const vm2 = vec3.fromValues(matrix[4], matrix[5], matrix[6])
    vec3.normalize(vm2, vm2)
    const m2 = vec3.len(vm2)

    for (let i = 0; i < 725; i += 1) {
      for (let j = 0; j < 725; j += 1) {
        const x = i
        const y = j
        const ox = (this.centerX + x * matrix[0] * m1 + y * matrix[4] * m2) >> 0
        const oy = (this.centerY + x * matrix[1] * m1 + y * matrix[5] * m2) >> 0
        const oz = (this.centerZ + x * matrix[2] * m1 + y * matrix[6] * m2) >> 0
        if (ox < 0 || ox > 511) {
          continue
        }

        if (oy < 0 || oy > 511) {
          continue
        }

        if (oz < 0 || oz > spZ * slice - 1) {
          continue
        }

        data[i * 1000 + j] = images.get(((oz + 1) * spZ) >> 0)[oy * 512 + ox]
      }
    }

    // mat4.invert(matrix, matrix)
    // const va = vec3.create()

    // const data = new Array(newW * newH).fill(0)
    // for (let i = 0; i < newH; i += 1) {
    //   for (let j = 0; j <= newW; j += 1) {
    //     vec3.set(va, this.centerX, i, j)
    //     vec3.transformMat4(va, va, matrix)
    //     vec3.round(va, va)

    //     if (va[0] >= 0 && va[0] <= column && va[1] >= 0 && va[1] <= row && va[2] >= 0 && va[2] < slice - 1) {
    //       const pixel = images.get(va[2] + 1)[va[1] * row + va[0]]
    //       data[i * newW + j] = pixel
    //     } else {
    //       data[i * newW + j] = -2000
    //     }
    //   }
    // }

    this.emit('render', {
      type: 'sagittal',
      buffer: data,
      width: 1000,
      height: 1000
    })
  }

  /** 冠状位 */
  makeCoronalImage() {
    const { column, row, slice } = this.config.size
    const { spX, spY, spZ } = this.config.spacing
    const newBuffer = [] // 存的是原始PixelData
    const newColumn = column
    const newRow = slice
    const { images: originImageBufferMap } = this.config
    for (let i = 0; i < newRow; i += 1) {
      for (let j = 0; j < newColumn; j += 1) {
        const data = originImageBufferMap.get(i + 1)[this.y * column + j]
        newBuffer[j * newRow + i] = data
      }
    }

    this.emit('render', {
      type: 'coronal',
      buffer: newBuffer,
      width: newRow,
      height: newColumn
    })
  }

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
