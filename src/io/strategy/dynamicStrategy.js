import AbstractStrategy from './abstractStrategy'

/**
 *
 * Created Date: 2020-01-19, 15:01:15 (zhenliang.sun)
 * Last Modified: 2020-01-20, 21:18:55 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

export default class DynamicStrategy extends AbstractStrategy {
  constructor() {
    super()
    this.orderChanged = false
  }

  hoisting(imageId) {
    this.orderChanged = true
    this.tasks.forEach(task => {
      if (task.imageId === imageId) {
        task.timestamp = Date.now()
      }
    })
  }

  pick() {
    if (this.orderChanged) {
      // 根据timestamp排序
      this._sort()
      this.orderChanged = false
    }

    return this.tasks.shift()
  }

  _sort() {
    this.tasks.sort((a, b) => b.timestamp - a.timestamp)
  }
}
