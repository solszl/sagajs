/**
 *
 * Created Date: 2020-01-19, 00:46:14 (zhenliang.sun)
 * Last Modified: 2020-04-02, 23:45:53 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */
import SDK from './sdk'
import ViewContainer from './view/viewContainer'
import { LOAD_EVENT_ENUM } from './constants/loader-event'
import { SLICE_EVENT_ENUM } from './constants/slice-event'

export default SDK

export { ViewContainer }

export { LOAD_EVENT_ENUM as LoaderEvent, SLICE_EVENT_ENUM as ImageEvent }
