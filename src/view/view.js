import TXComponent from '../component/component'
import Image from './image'
import Index3D from '../geometry/index3d'
/**
 *
 * Created Date: 2020-02-02, 16:04:54 (zhenliang.sun)
 * Last Modified: 2020-02-03, 00:05:30 (zhenliang.sun)
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

    this.image = new Image()
    this.currentSliceIndex = new Index3D(0, 0, 0)
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
      return
    }

    this.emit('切换了')
    return true
  }
}
