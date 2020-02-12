import TXComponent from '../component/component'
import Image from '../image/image'
import Index3D from '../geometry/index3d'
import { SLICE_EVENT_ENUM } from '../constants/slice-event'
/**
 *
 * Created Date: 2020-02-02, 16:04:54 (zhenliang.sun)
 * Last Modified: 2020-02-13, 00:59:25 (zhenliang.sun)
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
    this._colourMap = null

    // 当前序列
    this.currentSliceIndex = new Index3D(0, 0, 0)
  }

  generateImageData(buffer) {
    // 获取WindowLut

    // 获取颜色表

    // 根据广度解释进行颜色变换
    const imageSize = this.image.geometry.size.sliceSize // 获取图片尺寸， 即 512 * 512
    for (let i = 0; i < imageSize; i += 1) {}
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

    if (this.currentSliceIndex.equals(pos)) {
      return false
    }

    this.currentSliceIndex = pos
    this.emit(SLICE_EVENT_ENUM.SLICE_CHANGED, pos.k)
    return true
  }

  set colourMap(colourMap) {
    this._colourMap = colourMap
    this.emit(SLICE_EVENT_ENUM.COLOUR_MAP_CHANGED)
  }

  get colourMap() {
    return this._colourMap
  }
}
