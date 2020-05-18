import log from 'loglevel'
import IEvent from '../component/event'
import { INTERNAL_EVENT_ENUM } from '../constants/internal-event'

/**
 *
 * Created Date: 2020-02-16, 23:34:17 (zhenliang.sun)
 * Last Modified: 2020-04-28, 15:58:28 (zhenliang.sun)
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
class ViewManager extends IEvent {
  constructor() {
    super()
    this.views = new Map()
    this.currentView = null
  }

  addView(view) {
    log.info(`add new viewContainer, rootId: ${view.rootId}.`)
    this.views.set(view.rootId, view)

    if (this.currentView === null) {
      this.currentView = view
      this.emit(INTERNAL_EVENT_ENUM.VIEW_CHANGE, { view })
    }

    // const el = document.querySelector(`#${view.rootId}`)
    // el.addEventListener('mouseenter', e => {
    //   const view = this.getView(e.target.id)
    //   if (view && this.currentView !== view) {
    //     log.info(`dispatch view_change, named: ${e.target.id}.`)
    //     this.emit(INTERNAL_EVENT_ENUM.VIEW_CHANGE, { view })
    //   }
    // })
  }

  removeView(view) {
    log.info(`remove a viewContainer & destroy, named: ${view.rootId}.`)
    this.views.delete(view.rootId)
    view.destroy()
    const el = document.querySelector(`#${view.rootId}`)
    el.onmouseenter = null
  }

  getView(root) {
    return this.views.get(root)
  }
}

export default ViewManager
