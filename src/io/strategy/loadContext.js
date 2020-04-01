/**
 *
 * Created Date: 2020-01-20, 15:56:08 (zhenliang.sun)
 * Last Modified: 2020-04-01, 11:40:47 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

import { delay } from 'nanodelay'

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

  async pick() {
    if (!this.strategy) {
      return
    }

    // for CPU performance. from: 10~14% to 7~8%
    // 理论上，间隔越大CPU使用率越低，调整间隔500ms， cpu使用率越在2%
    await delay(50)
    return this.strategy.pick()
  }

  isAllComplete() {
    return this.strategy.getLength() === 0
  }
}
