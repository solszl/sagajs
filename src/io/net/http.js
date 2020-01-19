/**
 *
 * Created Date: 2020-01-19, 15:18:26 (zhenliang.sun)
 * Last Modified: 2020-01-19, 15:58:27 (zhenliang.sun)
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
      onloadend: this._onloadend.bind(this)
    }

    this.xhr = new XMLHttpRequest()
    this.xhr.timeout = 5000
    this.xhr.responseType = 'arrayBuffer'
    this.xhr.ontimeout = this.e.timeout
    this.xhr.onloadend = this.e.onLoadend
    this.xhr.onerror = this.e.error
    this.xhr.onload = this.e.onload

    this.onError = null
    this.onLoad = null
    this.onLoadend = null
    this.onTimeout = null
  }

  fire(url) {
    if (!this.xhr) {
      return
    }

    this.xhr.open('GET', url)
    this.xhr.send()
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
  }

  _onError(e) {
    this.onError && this.onError(e.target.response)
    this.onError = null
  }

  _onTimeout(e) {
    this.onTimeout && this.onTimeout(e.target)
    this.onTimeout = null
  }

  _onLoad(e) {
    if (!e.target) {
      return
    }

    if (!e.target.response) {
      return
    }

    const { code, data, msg } = e.target.response
    if (+code !== 200) {
      this._onError(e)
      return
    }

    this.onLoad && this.onLoad(data)
    this.onLoad = null
  }

  _onloadend(e) {
    this.onLoadend && this.onLoadend(e.target)
    this.onLoadend = null
  }
}
