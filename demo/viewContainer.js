import ViewContainer from '../src/view/viewContainer'
import ViewManager from '../src/manager/viewManager'
import log from 'loglevel'

/**
 *
 * Created Date: 2020-02-25, 17:32:51 (zhenliang.sun)
 * Last Modified: 2020-03-01, 01:55:12 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

log.setDefaultLevel(1)

const urls = []
for (let i = 1; i < 10; i += 1) {
  urls.push(`http://127.0.0.1:8887/${i}`)
}

const viewContainer = new ViewContainer('container')
viewContainer.setURLs(urls)
window.aa = viewContainer

const manager = new ViewManager()
manager.addView(viewContainer)
manager.activeView('container')
