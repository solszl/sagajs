import TXComponent from '../component/component'
import Image from '../image/image'
import Index3D from '../geometry/index3d'
import { SLICE_EVENT_ENUM } from '../constants/slice-event'
import WWWC from '../image/lut/wwwc'
import ColourMap from '../image/lut/colourmap'
import Rescale from '../image/lut/rescale'
import W from '../image/lut/window'
/**
 *
 * Created Date: 2020-02-02, 16:04:54 (zhenliang.sun)
 * Last Modified: 2020-02-16, 02:28:36 (zhenliang.sun)
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
    // 配色表
    this._colourMap = new ColourMap()
    // 创宽窗位集合
    this.wwwcs = {}

    // 当前序列
    this.currentSliceIndex = null
    this.currentWWWC = null
    this.windowLut = null
  }

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

  setWWWC(width, center) {
    const rsi = this.image.rsis[0]
    const { bitsStored, pixelRepresentation } = this.image.metaData
    const rescaleLut = new Rescale(rsi, bitsStored)
    const windowLut = new W(rescaleLut, pixelRepresentation)

    // 设置窗宽窗位后，重建lut映射表
    const newWWWC = new WWWC(width, center)

    if (this.currentWWWC && this.currentWWWC.equals(newWWWC)) {
      return
    }

    this.currentWWWC = newWWWC

    windowLut.setWWWC(this.currentWWWC)

    this.windowLut = windowLut
    this.emit(SLICE_EVENT_ENUM.WINDOW_WWWC_CHANGED, {
      wc: newWWWC.center,
      ww: newWWWC.width
    })
  }

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
