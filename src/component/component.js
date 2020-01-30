import IEvent from './event'

/**
 *
 * Created Date: 2020-01-21, 16:03:26 (zhenliang.sun)
 * Last Modified: 2020-01-31, 03:09:16 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

/**
 * 组件基类
 *
 * @export
 * @class TXComponent
 * @author zhenliang.sun
 */
export default class TXComponent extends IEvent {
  constructor() {
    super()
  }

  destroy() {}
}
