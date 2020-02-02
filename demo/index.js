import View from '../src/view/view'

/**
 *
 * Created Date: 2020-01-19, 17:04:33 (zhenliang.sun)
 * Last Modified: 2020-02-03, 00:06:35 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

// const urls = [
//   'http://192.168.110.214:8000/CT_Lung/1217056462/1.2.840.20171228.32933793/1.2.840.113619.2.55.3.2831183620.19.1513932125.217.4/1.2.840.113619.2.55.3.2831183620.19.1513932125.258.5',
//   'http://192.168.110.214:8000/CT_Lung/1217056462/1.2.840.20171228.32933793/1.2.840.113619.2.55.3.2831183620.19.1513932125.217.4/1.2.840.113619.2.55.3.2831183620.19.1513932125.258.6',
//   'http://192.168.110.214:8000/CT_Lung/1217056462/1.2.840.20171228.32933793/1.2.840.113619.2.55.3.2831183620.19.1513932125.217.4/1.2.840.113619.2.55.3.2831183620.19.1513932125.258.7',
//   'http://192.168.110.214:8000/CT_Lung/1217056462/1.2.840.20171228.32933793/1.2.840.113619.2.55.3.2831183620.19.1513932125.217.4/1.2.840.113619.2.55.3.2831183620.19.1513932125.258.8',
//   'http://192.168.110.214:8000/CT_Lung/1217056462/1.2.840.20171228.32933793/1.2.840.113619.2.55.3.2831183620.19.1513932125.217.4/1.2.840.113619.2.55.3.2831183620.19.1513932125.258.9',
//   'http://192.168.110.214:8000/CT_Lung/1217056462/1.2.840.20171228.32933793/1.2.840.113619.2.55.3.2831183620.19.1513932125.217.4/1.2.840.113619.2.55.3.2831183620.19.1513932125.258.10',
//   'http://192.168.110.214:8000/CT_Lung/1217056462/1.2.840.20171228.32933793/1.2.840.113619.2.55.3.2831183620.19.1513932125.217.4/1.2.840.113619.2.55.3.2831183620.19.1513932125.258.11',
//   'http://192.168.110.214:8000/CT_Lung/1217056462/1.2.840.20171228.32933793/1.2.840.113619.2.55.3.2831183620.19.1513932125.217.4/1.2.840.113619.2.55.3.2831183620.19.1513932125.258.12',
//   'http://192.168.110.214:8000/CT_Lung/1217056462/1.2.840.20171228.32933793/1.2.840.113619.2.55.3.2831183620.19.1513932125.217.4/1.2.840.113619.2.55.3.2831183620.19.1513932125.258.13',
//   'http://192.168.110.214:8000/CT_Lung/1217056462/1.2.840.20171228.32933793/1.2.840.113619.2.55.3.2831183620.19.1513932125.217.4/1.2.840.113619.2.55.3.2831183620.19.1513932125.258.14',
//   'http://192.168.110.214:8000/CT_Lung/1217056462/1.2.840.20171228.32933793/1.2.840.113619.2.55.3.2831183620.19.1513932125.217.4/1.2.840.113619.2.55.3.2831183620.19.1513932125.258.15'
// ]

const urls = [
  'http://192.168.199.136:8887/1.2.840.113704.1.111.5560.1384995322.5910.dcm',
  'http://192.168.199.136:8887/1.2.840.113704.1.111.5560.1384995322.5911.dcm',
  'http://192.168.199.136:8887/1.2.840.113704.1.111.5560.1384995322.5912.dcm',
  'http://192.168.199.136:8887/1.2.840.113704.1.111.5560.1384995323.5913.dcm',
  'http://192.168.199.136:8887/1.2.840.113704.1.111.5560.1384995323.5914.dcm',
  'http://192.168.199.136:8887/1.2.840.113704.1.111.5560.1384995323.5915.dcm',
  'http://192.168.199.136:8887/1.2.840.113704.1.111.5560.1384995323.5916.dcm',
  'http://192.168.199.136:8887/1.2.840.113704.1.111.5560.1384995324.5917.dcm',
  'http://192.168.199.136:8887/1.2.840.113704.1.111.5560.1384995324.5918.dcm',
  'http://192.168.199.136:8887/1.2.840.113704.1.111.5560.1384995324.5919.dcm'
]

const view = new View()
view.urls = urls
window.view = view
