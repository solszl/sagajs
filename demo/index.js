import Http from '../src/io/net/http'

/**
 *
 * Created Date: 2020-01-19, 17:04:33 (zhenliang.sun)
 * Last Modified: 2020-01-19, 17:08:21 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

const h = new Http()
const url =
  'http://192.168.110.214:8000/CT_Lung/1217056462/1.2.840.20171228.32933793/1.2.840.113619.2.55.3.2831183620.19.1513932125.217.4/1.2.840.113619.2.55.3.2831183620.19.1513932125.258.5'
h.onLoad = e => {
  console.log('load', e)
}
h.fire(url)
