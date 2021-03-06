import TXComponent from '../component/component'
import { SLICE_EVENT_ENUM } from '../constants/slice-event'
import Image from '../image/image'
import ColourMap from '../image/lut/colourmap'
import Rescale from '../image/lut/rescale'
import W from '../image/lut/window'
import WWWC from '../image/lut/wwwc'
import { INTERNAL_EVENT_ENUM } from '../constants/internal-event'
import log from 'loglevel'
/**
 *
 * Created Date: 2020-02-02, 16:04:54 (zhenliang.sun)
 * Last Modified: 2020-04-01, 17:49:39 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

/**
 * 视图
 *
 * @export
 * @class View
 * @extends {TXComponent}
 * @author zhenliang.sun
 */
export default class View extends TXComponent {
  constructor() {
    super()

    // 图像
    this.image = new Image()
    this.image.on(INTERNAL_EVENT_ENUM.FIRST_SLICE_LOAD_COMPLETED, () => {
      this.emit(INTERNAL_EVENT_ENUM.FIRST_SLICE_LOAD_COMPLETED)
    })
    // 配色表
    this._colourMap = new ColourMap()

    // 当前序列
    this.currentSliceIndex = null
    this.currentWWWC = null
    this.windowLut = null
  }

  /**
   * 修改imageData
   * 测试平均耗时 2~2.5ms
   * 渲染平均耗时 0.3ms
   *
   * @param {*} buffer
   * @memberof View
   */
  generateImageData(buffer /** imageData */) {
    // 获取lut映射表
    if (!this.windowLut) {
      this.generateDefaultWindowLut()
    }

    // 获取颜色表
    const colourMap = this.colourMap.colour
    // 获取原始图像数据进行加工、加工的是一个imageData，将其直接绘制到canvas
    const originPixelData = this.image.pixelBuffer.get(this.sliceIndex.k)

    let pixelIndex = 0
    let bufferIndex = 0
    while (pixelIndex < originPixelData.length) {
      const pixelData = this.windowLut.getValue(originPixelData[pixelIndex])
      buffer.data[bufferIndex] = colourMap.red[pixelData] // red
      buffer.data[bufferIndex + 1] = colourMap.green[pixelData] // green
      buffer.data[bufferIndex + 2] = colourMap.blue[pixelData] // blue
      buffer.data[bufferIndex + 3] = 0xff // alpha
      pixelIndex += 1
      bufferIndex += 4
    }
  }

  /**
   * 设置窗宽窗位
   * 平均耗时 2ms
   *
   * @param {*} width
   * @param {*} center
   * @memberof View
   */
  setWWWC(width, center) {
    // 设置窗宽窗位后，重建lut映射表
    const newWWWC = new WWWC(width, center)

    if (this.currentWWWC && this.currentWWWC.equals(newWWWC)) {
      return
    }

    this.currentWWWC = newWWWC
    this.windowLut.setWWWC(newWWWC)

    this.emit(SLICE_EVENT_ENUM.WINDOW_WWWC_CHANGED, {
      wc: newWWWC.center,
      ww: newWWWC.width
    })
  }

  /**
   * 创建默认映射表
   *
   * @memberof View
   */
  generateDefaultWindowLut() {
    const rsi = this.image.rsis[0]
    const { bitsStored, pixelRepresentation } = this.image.metaData
    const rescaleLut = new Rescale(rsi, bitsStored)
    const windowLut = new W(rescaleLut, pixelRepresentation)
    const wwwc = new WWWC(1500, -600) // 默认(1500,-600) 即肺产品线
    windowLut.setWWWC(wwwc)
    this.currentWWWC = wwwc
    this.windowLut = windowLut
  }

  getRescaleValue(x, y) {
    const pos = this.sliceIndex

    const originPixelData = this.image.pixelBuffer.get(pos.k)

    const rsi = this.image.rsis[pos.k - 1]
    const { row } = this.image.geometry.size
    const offset = x + y * row // 是 x+y*row, 并不是 x* column+y, 头疼。。。

    return rsi.apply(originPixelData[offset])
  }

  destroy() {
    super.destroy()
    log.info('[view] destroy.')
    this.image.destroy()
    this.windowLut.destroy()
    this._colourMap = null
    this.currentSliceIndex = null
    this.currentWWWC = null
    this.windowLut = null
    this.image = null
  }

  set urls(urls) {
    this.image.setURLS(urls)
  }

  get sliceIndex() {
    // index3d
    return this.currentSliceIndex
  }

  set sliceIndex(pos) {
    if (!this.image.geometry.size.isInBounds(pos.i, pos.j, pos.k)) {
      return false
    }

    if (this.currentSliceIndex && this.currentSliceIndex.equals(pos)) {
      return false
    }

    this.currentSliceIndex = pos
    this.emit(SLICE_EVENT_ENUM.SLICE_CHANGED, pos.k)
    return true
  }

  set colourMap(name) {
    this._colourMap.colour = name
    this.emit(SLICE_EVENT_ENUM.COLOUR_MAP_CHANGED)
  }

  get colourMap() {
    return this._colourMap
  }
}
