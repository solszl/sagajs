import View from '../src/view/view'
import WWWC from '../src/image/lut/wwwc'

/**
 *
 * Created Date: 2020-01-19, 17:04:33 (zhenliang.sun)
 * Last Modified: 2020-02-15, 01:57:08 (zhenliang.sun)
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

const buffer = new ImageData(512, 512)
const canvas = document.querySelector('#cvs')
let ready = false

const view = new View()
view.urls = urls

view.on('saga-colour-map-changed', () => {
  console.log('颜色表换了')
  drawBuffer()
})
view.on('saga-wwwc-changed', e => {
  const { ww, wc } = e
  console.log('窗宽、窗位变了', ww, wc)
  drawBuffer()
})
view.on('saga-slice-changed', () => {
  console.log('索引变了')
})

view.colourMap = 'normal'
view.setWWWC(448, 856)

window.view = view

let isMousedown = false
let lastX = 0
let lastY = 0
canvas.addEventListener('mousedown', e => {
  console.log('mousedown', e)
  isMousedown = true
  lastX = e.pageX
  lastY = e.pageY
})

canvas.addEventListener('mouseup', e => {
  isMousedown = false
})

canvas.addEventListener('mousemove', e => {
  if (!isMousedown) {
    return
  }

  var deltaX = e.pageX - lastX
  var deltaY = e.pageY - lastY
  lastX = e.pageX
  lastY = e.pageY

  console.log(deltaX, deltaY)
  const currentWWWC = view.currentWWWC
  view.setWWWC(currentWWWC.width + deltaX, currentWWWC.center + deltaY)
})

setTimeout(() => {
  ready = true
  drawBuffer()
}, 2000)

function drawBuffer() {
  if (!ready) {
    return
  }
  view.generateImageData(buffer)
  canvas.getContext('2d').putImageData(buffer, 0, 0)
}
