import NanoEvents from 'nanoevents'

/**
 *
 * Created Date: 2020-01-19, 17:23:55 (zhenliang.sun)
 * Last Modified: 2020-01-20, 11:38:41 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

export default class IEvent {
  constructor() {
    this.emitter = new NanoEvents()
  }

  on() {
    return this.emitter.on.apply(this.emitter, arguments)
  }

  emit(type, ...args) {
    this.emitter.emit(type, ...args)
  }
}
