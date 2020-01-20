/**
 *
 * Created Date: 2020-01-20, 15:56:08 (zhenliang.sun)
 * Last Modified: 2020-01-20, 20:39:02 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

/**
 *
 *
 * @export
 * @class LoadContext
 * @author zhenliang.sun
 */
export default class LoadContext {
  constructor() {
    this.strategy = null
  }

  install(urls) {
    if (!this.strategy) {
      return
    }

    this.strategy.install(urls)
  }

  hoisting(imageId) {
    if (!this.strategy) {
      return
    }

    this.strategy.hoisting(imageId)
  }

  pick() {
    if (!this.strategy) {
      return
    }

    return this.strategy.pick()
  }

  isAllComplete() {
    return this.strategy.getLength() === 0
  }
}
