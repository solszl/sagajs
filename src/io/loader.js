/**
 *
 * Created Date: 2020-01-19, 00:56:45 (zhenliang.sun)
 * Last Modified: 2020-01-19, 01:51:11 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

/**
 * 加载器
 *
 * @export
 * @class Loader
 * @author zhenliang.sun
 */
export default class Loader {
  constructor() {
    /** 是否正在加载 */
    this.isLoading = false
    this.loadOption = {}
  }

  abort() {}

  destroy() {}
}
