import Loader from '../src/io/loader'
import { LOAD_EVENT_ENUM } from '../src/constants/loader-event'

/**
 *
 * Created Date: 2020-01-19, 17:04:33 (zhenliang.sun)
 * Last Modified: 2020-01-19, 18:33:54 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

const url =
  'http://192.168.110.214:8000/CT_Lung/1217056462/1.2.840.20171228.32933793/1.2.840.113619.2.55.3.2831183620.19.1513932125.217.4/1.2.840.113619.2.55.3.2831183620.19.1513932125.258.5'

const loader = new Loader()
loader.on(LOAD_EVENT_ENUM.ITEM_LOAD_COMPLETE, e => {
  console.log(e)
})

loader.on(LOAD_EVENT_ENUM.ITEM_LOAD_ERROR, e => {
  console.log(e)
})

loader.on(LOAD_EVENT_ENUM.ITEM_LOAD_ABORT, e => {
  console.log('aaa')
})
loader.load(url)

window.a = loader
