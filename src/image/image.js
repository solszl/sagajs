import IO from '../io/io'
import { LOAD_EVENT_ENUM } from '../constants/loader-event'
import { parse } from '../io/process/dataProcess'

/**
 *
 * Created Date: 2020-02-01, 00:07:39 (zhenliang.sun)
 * Last Modified: 2020-02-01, 01:56:27 (zhenliang.sun)
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
  }

  setURLS(urls) {
    this.io.setUrls(urls)
  }

  addSlice(arrayBuffer) {}

  appendBuffer(pixelBuffer) {}

  _itemLoadComplete(e) {
    console.log('dicom加载完成', e)
    if (this.firstParse) {
      const { buffer } = e
      parse(buffer)
      this.firstParse = false
    }
  }
}
