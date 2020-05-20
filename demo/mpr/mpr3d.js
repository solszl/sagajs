/**
 *
 * Created Date: 2020-04-27, 15:53:26 (zhenliang.sun)
 * Last Modified: 2020-05-20, 17:51:46 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

import { mat4, vec3 } from 'gl-matrix'
import IEvent from '../../src/component/event'

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

    this.lastAngleX = null
    this.lastAngleY = null
    this.lastAngleZ = null
  }

  make(centerX, centerY, centerZ, angleX, angleY, angleZ) {
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
    console.log(`centerX:${this.centerX}, centerY:${this.centerY}, centerZ:${this.centerZ}`)
    console.log(`angleX:${this.angleX}, angleY:${this.angleY}, angleZ:${this.angleZ}`)
    // // 轴状位
    // this.makeAxisImage()
    // // // 矢状位
    // this.makeSagittalImage()
    // // // 冠状位
    // this.makeCoronalImage()
    const ax = ~~angleX
    const ay = ~~angleY
    const az = ~~angleZ

    const cx = ~~centerX
    const cy = ~~centerY
    const cz = ~~centerZ
    this.renderAxis = true
    this.renderSagittal = true
    this.renderCoronal = true
    if (this.lastAngleX === ax && this.lastAngleY === ay) {
      // axis no render
      this.renderAxis = false
    }

    if (this.lastAngleY === ay && this.lastAngleZ === az) {
      // sagittal no render
      this.renderSagittal = false
    }

    if (this.lastAngleZ === az && this.lastAngleX === ax) {
      // coronal no render
      this.renderCoronal = false
    }

    if (this.centerX !== cx || this.centerY !== cy || this.centerZ !== cz) {
      this.renderAxis = true
      this.renderSagittal = true
      this.renderCoronal = true
    }

    this.centerX = cx
    this.centerY = cy
    this.centerZ = cz
    this.angleX = ax
    this.angleY = ay
    this.angleZ = az

    this.lastAngleX = ax
    this.lastAngleY = ay
    this.lastAngleZ = az
  }

  /** 轴状位 */
  makeAxisImage(angleX, angleY) {
    if (!this.renderAxis) {
      return
    }

    console.time('轴状位 数据构建')
    const ax = angleX || this.angleX
    const ay = angleY || this.angleY
    const { spY, spZ } = this.config.spacing
    const { column, row, slice } = this.config.size
    const { images } = this.config
    const data = new Array(725 * 725).fill(0)
    const matrix = mat4.create()

    mat4.rotateY(matrix, matrix, (ay / 180) * Math.PI)
    mat4.rotateX(matrix, matrix, (ax / 180) * Math.PI)

    const vm1 = vec3.fromValues(matrix[0], matrix[1], matrix[2])
    const m1 = vec3.len(vm1)
    const vm2 = vec3.fromValues(matrix[4], matrix[5], matrix[6])
    const m2 = vec3.len(vm2)

    for (let x = 0; x < 725; x += 1) {
      const tempX = x - this.centerX
      const tempMat0 = tempX * matrix[0] * m1
      const tempMat1 = tempX * matrix[1] * m1
      const tempMat2 = tempX * matrix[2] * m1
      for (let y = 0; y < 725; y += 1) {
        const tempY = y - this.centerY
        const ox = (this.centerX + tempMat0 + tempY * matrix[4] * m2) >> 0
        if (ox < 0 || ox > 511) {
          continue
        }

        const oy = (this.centerY + tempMat1 + tempY * matrix[5] * m2) >> 0
        if (oy < 0 || oy > 511) {
          continue
        }

        const oz = (this.centerZ + tempMat2 + tempY * matrix[6] * m2) >> 0
        if (oz < 0 || oz > spZ * (slice - 1)) {
          continue
        }

        const zIndex = Math.max(((oz + 1) / spZ) >> 0, 1)
        data[y * 725 + x] = images.get(zIndex)[oy * 512 + ox]
      }
    }

    console.timeEnd('轴状位 数据构建')
    this.emit('render', {
      type: 'axis',
      buffer: data,
      width: 725,
      height: 725
    })
  }

  /** 矢状位 */
  makeSagittalImage(angleY, angleZ) {
    if (!this.renderSagittal) {
      return
    }

    console.time('矢状位 数据构建')
    const ay = angleY || this.angleY
    const az = angleZ || this.angleZ
    const { spY, spZ } = this.config.spacing
    const { column, row, slice } = this.config.size
    const { images } = this.config

    console.error(ay, az)
    const data = new Array(725 * 725).fill(0)
    const matrix = mat4.create()

    mat4.rotateY(matrix, matrix, (ay / 180) * Math.PI)
    mat4.rotateZ(matrix, matrix, (az / 180) * Math.PI)

    const vm1 = vec3.fromValues(matrix[4], matrix[5], matrix[6])
    const m1 = vec3.len(vm1)
    const vm2 = vec3.fromValues(matrix[8], matrix[9], matrix[10])
    const m2 = vec3.len(vm2)

    for (let x = 0; x < 725; x += 1) {
      const tempX = x - this.centerX
      const tempMat4 = tempX * matrix[4] * m1
      const tempMat5 = tempX * matrix[5] * m1
      const tempMat6 = tempX * matrix[6] * m1
      for (let y = 0; y < 725; y += 1) {
        const tempY = y - this.centerY
        const ox = (this.centerX + tempMat4 + tempY * matrix[8] * m2) >> 0
        if (ox < 0 || ox > 511) {
          continue
        }

        const oy = (this.centerY + tempMat5 + tempY * matrix[9] * m2) >> 0
        if (oy < 0 || oy > 511) {
          continue
        }

        const oz = (this.centerZ + tempMat6 + tempY * matrix[10] * m2) >> 0
        if (oz < 0 || oz > spZ * (slice - 1)) {
          continue
        }

        const zIndex = Math.max(((oz + 1) / spZ) >> 0, 1)
        data[y * 725 + x] = images.get(zIndex)[oy * 512 + ox]
      }
    }

    console.timeEnd('矢状位 数据构建')

    this.emit('render', {
      type: 'sagittal',
      buffer: data,
      width: 725,
      height: 725
    })
  }

  /** 冠状位 */
  makeCoronalImage(angleX, angleZ) {
    if (!this.renderCoronal) {
      return
    }

    console.time('冠状位 数据构建')
    const ax = angleX || this.angleX
    const az = angleZ || this.angleZ
    const { column, row, slice } = this.config.size
    const { spX, spY, spZ } = this.config.spacing
    const { images } = this.config

    const data = new Array(725 * 725).fill(0)
    const matrix = mat4.create()

    mat4.rotateX(matrix, matrix, (ax / 180) * Math.PI)
    mat4.rotateZ(matrix, matrix, (az / 180) * Math.PI)

    const vm1 = vec3.fromValues(matrix[0], matrix[1], matrix[2])
    const m1 = vec3.len(vm1)
    const vm2 = vec3.fromValues(matrix[8], matrix[9], matrix[10])
    const m2 = vec3.len(vm2)

    for (let x = 0; x < 725; x += 1) {
      const tempX = x - this.centerX
      const tempMat0 = tempX * matrix[0] * m1
      const tempMat1 = tempX * matrix[1] * m1
      const tempMat2 = tempX * matrix[2] * m1
      for (let y = 0; y < 725; y += 1) {
        const tempY = y - this.centerY
        const ox = (this.centerX + tempMat0 + tempY * matrix[8] * m2) >> 0
        if (ox < 0 || ox > 511) {
          continue
        }

        const oy = (this.centerY + tempMat1 + tempY * matrix[9] * m2) >> 0
        if (oy < 0 || oy > 511) {
          continue
        }

        const oz = (this.centerZ + tempMat2 + tempY * matrix[10] * m2) >> 0
        if (oz < 0 || oz > spZ * (slice - 1)) {
          continue
        }

        const zIndex = Math.max(((oz + 1) / spZ) >> 0, 1)
        data[y * 725 + x] = images.get(zIndex)[oy * 512 + ox]
      }
    }

    console.timeEnd('冠状位 数据构建')
    this.emit('render', {
      type: 'coronal',
      buffer: data,
      width: 725,
      height: 725
    })
  }
}

export default MPR3D
