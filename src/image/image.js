import IO from '../io/io'
import { LOAD_EVENT_ENUM } from '../constants/loader-event'
import { parse } from '../io/process/dataProcess'
import Size from '../geometry/size'
import Geometry from '../geometry/geometry'
import Point3D from '../geometry/point3D'
import Vector3D from '../geometry/vector3D'
import Matrix33 from '../geometry/matrix33'
import Spacing from '../geometry/spacing'
import RescaleSlopeIntercept from '../geometry/rescaleSlopeIntercept'

/**
 *
 * Created Date: 2020-02-01, 00:07:39 (zhenliang.sun)
 * Last Modified: 2020-02-13, 02:02:22 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

export default class Image {
  constructor() {
    this.io = new IO()
    this.io.on(
      LOAD_EVENT_ENUM.ITEM_LOAD_COMPLETE,
      this._itemLoadComplete.bind(this)
    )
    this.firstParse = true
    this.pixelBuffer = new Map()
    this.rsis = []
  }

  setURLS(urls) {
    this.io.setUrls(urls)
  }

  appendSlice(parsedObject) {
    // 给空间追加各种信息
    const { origin, slicePosition } = parsedObject
    this.geometry.size.increaseSlice()
    this.geometry.appendOrigin(origin, slicePosition)

    // 添加校准系数
    const { slope, intercept } = parsedObject
    const rsi = new RescaleSlopeIntercept(slope, intercept)
    this.rsis.splice(slicePosition, 0, rsi)
  }

  appendBuffer(pixelBuffer, index) {
    this.pixelBuffer.set(index, pixelBuffer)
  }

  /**
   * 创建一个集合空间
   *
   * @param {*} parsedObject
   * @memberof Image
   */
  createGeometry(parsedObject) {
    const { origin, orientation, pixelSpacing, columns, rows } = parsedObject
    const _origin = new Point3D()
    _origin.fromArray(origin)

    const fn = i => {
      return parseFloat(orientation[i])
    }
    const _row = new Vector3D(fn(0), fn(1), fn(2))
    const _column = new Vector3D(fn(3), fn(4), fn(5))
    const _normal = _row.crossProduct(_column)
    const _orientationMatrix = new Matrix33(
      _row.x,
      _row.y,
      _row.z,
      _column.x,
      _column.y,
      _column.z,
      _normal.x,
      _normal.y,
      _normal.z
    )

    const _spacing = new Spacing(pixelSpacing[0], pixelSpacing[1])

    const _size = new Size(columns, rows)

    this.geometry = new Geometry(_origin, _spacing, _size, _orientationMatrix)
  }

  async _itemLoadComplete(e) {
    console.log('dicom加载完成', e)
    const { buffer } = e
    const parsedObject = await parse(buffer)
    if (this.firstParse) {
      this.createGeometry(parsedObject)
      this.firstParse = false
    }

    const { pixelData, slicePosition } = parsedObject
    this.appendSlice(parsedObject)
    this.appendBuffer(pixelData, slicePosition)
  }
}
