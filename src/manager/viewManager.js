import log from 'loglevel'

/**
 *
 * Created Date: 2020-02-16, 23:34:17 (zhenliang.sun)
 * Last Modified: 2020-03-01, 01:27:56 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

/**
 * 视图管理器
 * 每个视图包含 图像层、工具层
 * 支持多选中概念，为了link功能
 *
 * @class ViewManager
 * @author zhenliang.sun
 */
class ViewManager {
  constructor() {
    this.views = new Map()
  }

  addView(view) {
    log.info(`add new viewContainer, rootId: ${view.rootId}.`)
    this.views.set(view.rootId, view)
  }

  removeView(view) {
    log.info(`remove a viewContainer, named: ${view.rootId}.`)
    this.views.delete(view.rootId)
  }

  getView(root) {
    log.info(`get a viewContainer, named: ${root}.`)
    return this.views.get(root)
  }

  activeView(root) {
    log.info(`active a viewContainer, named: ${root}`)
    const view = this.getView(root)
    if (view) {
      view.active = true
    }
  }

  deactivateView(root) {
    log.info(`deactivate a viewContainer, named: ${root}`)
    const view = this.getView(root)
    if (view) {
      view.active = false
    }
  }
}

export default ViewManager
