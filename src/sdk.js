/**
 *
 * Created Date: 2020-04-02, 23:37:38 (zhenliang.sun)
 * Last Modified: 2020-04-07, 16:40:35 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

import ViewManager from './manager/viewManager'
import ToolsManager from './manager/toolsManager'
import { INTERNAL_EVENT_ENUM } from './constants/internal-event'

class SDK {
  constructor() {
    this.viewManager = new ViewManager()
    this.toolManager = new ToolsManager()

    this.currentView = null

    this.viewManager.on(INTERNAL_EVENT_ENUM.VIEW_CHANGE, e => {
      const { view } = e
      // 既可以通过e来获取view， 也可以通过viewManager来获取view
      this.currentView = view

      this.toolManager.currentView = view
    })
  }
}

export default SDK
