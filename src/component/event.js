import { createNanoEvents } from 'nanoevents'

/**
 *
 * Created Date: 2020-01-19, 17:23:55 (zhenliang.sun)
 * Last Modified: 2020-03-25, 00:59:07 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

/**
 * 事件基类
 *
 * @export
 * @class IEvent
 * @author zhenliang.sun
 */
export default class IEvent {
  constructor() {
    this.emitter = createNanoEvents()
  }

  on() {
    return this.emitter.on.apply(this.emitter, arguments)
  }

  emit(type, ...args) {
    this.emitter.emit(type, ...args)
  }
}
