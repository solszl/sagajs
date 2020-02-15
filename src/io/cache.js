/**
 *
 * Created Date: 2020-01-19, 11:40:41 (zhenliang.sun)
 * Last Modified: 2020-01-20, 21:12:03 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

/**
 *
 *
 * @export
 * @class Cache
 */
export default class Cache {
  constructor() {
    this.cache = new Map()
  }

  setCache(key, value) {
    this.cache.set(key, value)
  }

  getCache(key) {
    this.cache.get(key)
  }

  hasCache(key) {
    return this.cache.has(key)
  }

  clear() {
    this.cache.clear()
  }

  length() {
    return this.cache.size
  }
}
