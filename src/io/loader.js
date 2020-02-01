import Http from './net/http'
import IEvent from '../component/event'
import { LOAD_EVENT_ENUM } from '../constants/loader-event'

/**
 *
 * Created Date: 2020-01-19, 00:56:45 (zhenliang.sun)
 * Last Modified: 2020-02-01, 00:46:28 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

/**
 * 加载器
 *
 * @export
 * @class Loader
 * @author zhenliang.sun
 */
export default class Loader extends IEvent {
  constructor() {
    super()
    /** 是否正在加载 */
    this.isLoading = false

    this.costTime = 0
    this.xhr = new Http()
    this.xhr.onLoadStart = e => {
      this.isLoading = true
      this.costTime = Date.now()
      this.emit(LOAD_EVENT_ENUM.ITEM_LOAD_START, e)
    }
    this.xhr.onLoad = e => {
      this.costTime = Date.now() - this.costTime
      const obj = {
        buffer: e,
        imageId: this.xhr.xhr.responseURL,
        costTime: this.costTime
      }

      this.emit(LOAD_EVENT_ENUM.ITEM_LOAD_COMPLETE, obj)
    }
    this.xhr.onError = e => {
      this.emit(LOAD_EVENT_ENUM.ITEM_LOAD_ERROR, e)
    }
    this.xhr.onTimeout = e => {
      this.emit(LOAD_EVENT_ENUM.ITEM_LOAD_TIMEOUT, e)
    }
    this.xhr.onAbort = e => {
      this.emit(LOAD_EVENT_ENUM.ITEM_LOAD_ABORT, e)
    }
    this.xhr.onLoadEnd = e => {
      this.isLoading = false
    }
  }

  load(url) {
    this.xhr.fire(url)
  }

  abort() {
    this.xhr.abort()
  }

  destroy() {
    if (this.isLoading) {
      this.abort()
    }
  }
}
