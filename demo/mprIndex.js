import log from 'loglevel'
import ViewContainer from '../src/view/viewContainer'
import SDK from '../src/sdk'
import { addEvent, initImageContainer } from './mpr/handler'
/**
 *
 * Created Date: 2020-04-27, 14:42:09 (zhenliang.sun)
 * Last Modified: 2020-05-06, 04:15:10 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

log.setDefaultLevel(1)

const urls = []
for (let i = 1; i <= 249; i += 1) {
  urls.push(
    // `http://127.0.0.1:8887/1.2.840.113619.2.278.3.2831172146.890.1539296548.557.${i}`
    `http://127.0.0.1:8887/${i}`
  )
}

const sdk = new SDK()
window.sdk = sdk

const viewContainer = new ViewContainer('content')
viewContainer.setURLs(urls)

const { viewManager } = sdk
viewManager.addView(viewContainer)

addEvent()

initImageContainer()
