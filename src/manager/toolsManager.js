/**
 *
 * Created Date: 2020-03-09, 23:08:40 (zhenliang.sun)
 * Last Modified: 2020-04-07, 21:24:51 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

import IEvent from '../component/event'

/**
 * 工具管理类
 *
 * @class ToolsManager
 * @author zhenliang.sun
 */
class ToolsManager extends IEvent {
  constructor() {
    super()

    this._currentView = null

    this._currentCommand = null
  }

  set currentView(view) {
    if (this._currentView === view) {
      return
    }

    this._currentView = view

    if (this._currentCommand) {
      this._currentCommand.execute()
    }
  }

  get currentView() {
    return this._currentView
  }
}

export default ToolsManager
