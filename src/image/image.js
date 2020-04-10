import IEvent from '../component/event'
import { LOAD_EVENT_ENUM } from '../constants/loader-event'
import Geometry from '../geometry/geometry'
import Matrix33 from '../geometry/matrix33'
import Point3D from '../geometry/point3D'
import RescaleSlopeIntercept from '../geometry/rescaleSlopeIntercept'
import Size from '../geometry/size'
import Spacing from '../geometry/spacing'
import Vector3D from '../geometry/vector3D'
import IO from '../io/io'
import { parse } from '../io/process/dataProcess'
import { INTERNAL_EVENT_ENUM } from '../constants/internal-event'
import log from 'loglevel'

/**
 *
 * Created Date: 2020-02-01, 00:07:39 (zhenliang.sun)
 * Last Modified: 2020-04-09, 19:01:22 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

export default class Image extends IEvent {
  constructor() {
    super()
    this.io = new IO()
    this.io.on(
      LOAD_EVENT_ENUM.ITEM_LOAD_COMPLETE,
      this._itemLoadComplete.bind(this)
    )

    // 是否是首次加载完成、首次的话构建一些必要数据
    this.firstParse = true
    // 加载进来所有图片的数据缓存
    this.pixelBuffer = new Map()
    this.rsis = []

    // 元数据
    this.metaData = {}
  }

  setURLS(urls) {
    this.io.setUrls(urls)
  }

  appendSlice(parsedObject) {
    // 给空间追加各种信息
    const { origin, slicePosition } = parsedObject
    // this.geometry.size.increaseSlice()
    // 序列不一定是顺序递增的，可能跳跃增加也有可能不全。所以总数量需要按照元数据解析出来的数量匹配
    // 使用这种方式后，可能造成的问题是，如果不是完整数据某些页数据可能不存在
    // 如，原始数据[1,2,3,4,5,6]  给定的数据为 [2,3,5], 这样最大层数为5 获取数据的时候，1，4可能为空
    this.geometry.size.increaseSliceTo(slicePosition)
    this.geometry.appendOrigin(origin, slicePosition)

    // 添加校准系数
    const { slope, intercept } = parsedObject
    const rsi = new RescaleSlopeIntercept(slope, intercept)
    if (this.rsis.length < slicePosition) {
      this.rsis.length = slicePosition - 1
    }
    this.rsis.splice(slicePosition - 1, 0, rsi)
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

  /**
   * 填充元数据
   *
   * @param {*} parsedObject
   * @memberof Image
   */
  createMetaData(parsedObject) {
    const { bitsStored, pixelRepresentation } = parsedObject
    // 日期相关
    const { studyDate, seriesDate, acquisitionDate, contentDate } = parsedObject
    // 时间相关
    const { studyTime, seriesTime, acquisitionTime, contentTime } = parsedObject
    // 压缩相关
    const { compression, compressRatio, compressMethod } = parsedObject
    const {
      rows,
      columns,
      thickness,
      pixelSpacing,
      orientation,
      origin
    } = parsedObject
    // overlay
    const {
      accessionNumber,
      patientId,
      studyDescription,
      seriesDescription,
      seriesNumber,
      sliceLocation
    } = parsedObject

    // 获取压缩方式
    const getCompression = (compress, ratio, method) => {
      if (compress === '01' && ratio) {
        const compressMethod = method || 'Lossy: '
        const compressRatio = parseFloat(ratio).toFixed(2)
        return `${compressMethod} ${compressRatio} : 1`
      }

      return 'Lossless / Uncompressed'
    }

    this.metaData = {
      bitsStored,
      pixelRepresentation,
      date: seriesDate || contentDate || studyDate || acquisitionDate,
      time: seriesTime || contentTime || studyTime || acquisitionTime,
      compress: getCompression(compression, compressRatio, compressMethod),
      rows,
      columns,
      origin,
      thickness,
      pixelSpacing,
      orientation,
      accessionNumber,
      patientId,
      studyDescription,
      seriesDescription,
      seriesNumber,
      sliceLocation
    }
  }

  async _itemLoadComplete(e) {
    console.log('dicom加载完成', e)
    const { buffer } = e
    const parsedObject = await parse(buffer)
    if (this.firstParse) {
      this.createGeometry(parsedObject)
      this.createMetaData(parsedObject)

      const { pixelData, slicePosition } = parsedObject
      this.appendSlice(parsedObject)
      this.appendBuffer(pixelData, slicePosition)

      // 向上层派发第一张dicom文件加载完成事件
      this.emit(INTERNAL_EVENT_ENUM.FIRST_SLICE_LOAD_COMPLETED)
      this.firstParse = false
      return
    }

    const { pixelData, slicePosition } = parsedObject
    this.appendSlice(parsedObject)
    this.appendBuffer(pixelData, slicePosition)
  }

  destroy() {
    log.info('[image] destroy')

    this.io.destroy()
    this.io = null

    this.pixelBuffer.clear()
    this.pixelBuffer = null
    this.rsis = []
    this.geometry = null
  }
}
