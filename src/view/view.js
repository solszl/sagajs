import TXComponent from '../component/component'
import Image from '../image/image'
import Index3D from '../geometry/index3d'
import { SLICE_EVENT_ENUM } from '../constants/slice-event'
import WWWC from '../image/lut/wwwc'
import ColourMap from '../image/lut/colourmap'
/**
 *
 * Created Date: 2020-02-02, 16:04:54 (zhenliang.sun)
 * Last Modified: 2020-02-15, 02:50:55 (zhenliang.sun)
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
  }

  generateImageData(buffer /** imageData */) {
    // 获取lut映射表
    const wwwc = this.currentWWWC
    // 获取颜色表
    const colourMap = this.colourMap.colour
    // 根据广度解释进行颜色变换
    const imageSize = this.image.geometry.size.sliceSize // 获取图片尺寸， 即 512 * 512
    const originPixelData = this.image.pixelBuffer.get(this.sliceIndex.k) // 根据原始图像数据进行加工
    // for (let i = 0; i < imageSize; i += 4) {
    let pixelIndex = 0
    let bufferIndex = 0
    while (pixelIndex < originPixelData.length) {
      const pixelData = wwwc.apply(originPixelData[pixelIndex])
      buffer.data[bufferIndex] = colourMap.red[pixelData] // red
      buffer.data[bufferIndex + 1] = colourMap.green[pixelData] // green
      buffer.data[bufferIndex + 2] = colourMap.blue[pixelData] // blue
      buffer.data[bufferIndex + 3] = 0xff // alpha
      pixelIndex += 1
      bufferIndex += 4
    }
  }

  setWWWC(width, center) {
    // 设置窗宽窗位后，重建lut映射表
    const newWWWC = new WWWC(width, center)

    if (this.currentWWWC && this.currentWWWC.equals(newWWWC)) {
      return
    }

    this.currentWWWC = newWWWC
    this.emit(SLICE_EVENT_ENUM.WINDOW_WWWC_CHANGED, {
      wc: newWWWC.center,
      ww: newWWWC.width
    })
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
