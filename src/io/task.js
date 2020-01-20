/**
 *
 * Created Date: 2020-01-19, 15:04:35 (zhenliang.sun)
 * Last Modified: 2020-01-20, 20:43:20 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

export default class Task {
  constructor() {
    this.imageId = ''
    this.priority = 0
    this.timestamp = Date.now()
  }
}
