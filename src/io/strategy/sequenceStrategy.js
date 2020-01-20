import AbstractStrategy from './abstractStrategy'

/**
 *
 * Created Date: 2020-01-19, 15:00:45 (zhenliang.sun)
 * Last Modified: 2020-01-20, 20:44:55 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

export default class SequenceStrategy extends AbstractStrategy {
  constructor() {
    super()
  }

  pick() {
    return this.tasks.shift()
  }
}
