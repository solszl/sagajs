/**
 *
 * Created Date: 2020-01-19, 15:18:26 (zhenliang.sun)
 * Last Modified: 2020-01-20, 20:56:43 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

/**
 * HTTP 请求类
 *
 * @export
 * @class Http
 * @author zhenliang.sun
 */
export default class Http {
  constructor() {
    this.e = {
      error: this._onError.bind(this),
      timeout: this._onTimeout.bind(this),
      onload: this._onLoad.bind(this),
      onloadend: this._onLoadend.bind(this),
      onloadstart: this._onLoadStart.bind(this),
      onabort: this._onAbort.bind(this)
    }

    this.xhr = new XMLHttpRequest()
    this.xhr.timeout = 5000
    this.xhr.responseType = 'arraybuffer'
    this.xhr.ontimeout = this.e.timeout
    this.xhr.onloadend = this.e.onloadend
    this.xhr.onerror = this.e.error
    this.xhr.onload = this.e.onload
    this.xhr.onloadstart = this.e.onloadstart
    this.xhr.onabort = this.e.onabort

    this.onError = null
    this.onLoad = null
    this.onLoadEnd = null
    this.onTimeout = null
    this.onLoadStart = null
    this.onAbort = null
  }

  fire(url) {
    if (!this.xhr) {
      return
    }

    this.xhr.open('GET', url)
    this.xhr.send()
  }

  abort() {
    this.xhr.abort()
  }

  destroy() {
    if (!this.xhr) {
      return
    }

    this.xhr.onerror = null
    this.xhr.onload = null
    this.xhr.onloadend = null
    this.xhr.ontimeout = null

    this.xhr = null

    this.onError = null
    this.onLoad = null
    this.onLoadend = null
    this.onTimeout = null
    this.onLoadStart = null
  }

  _onError(e) {
    const { status, statusText } = e.target
    this.onError && this.onError({ status, statusText })
  }

  _onTimeout(e) {
    this.onTimeout && this.onTimeout(e.target)
  }

  _onLoad(e) {
    if (!e.target) {
      return
    }

    if (!e.target.response) {
      return
    }

    const { status, response } = e.target
    if (+status !== 200) {
      this._onError(e)
      return
    }

    this.onLoad && this.onLoad(response)
  }

  _onLoadend(e) {
    this.onLoadend && this.onLoadend(e.target)
  }

  _onLoadStart(e) {
    this.onLoadStart && this.onLoadStart(e)
  }

  _onAbort(e) {
    this.onAbort && this.onAbort(e)
  }
}
