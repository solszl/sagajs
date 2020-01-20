import Task from '../task'

/**
 *
 * Created Date: 2020-01-19, 14:59:37 (zhenliang.sun)
 * Last Modified: 2020-01-20, 20:45:08 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

export default class AbstractStrategy {
  constructor() {
    this.tasks = []
  }

  install(urls) {
    urls.forEach(url => {
      const task = new Task()
      task.imageId = url
      task.priority = 1
      task.timestamp = Date.now()
      this.tasks.push(task)
    })
  }

  hoisting(imageId) {
    throw new Error('implements by subClass')
  }

  pick() {
    throw new Error('implements by subClass')
  }

  getLength() {
    return this.tasks.length
  }
}
