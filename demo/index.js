import View from '../src/view/view'
import WWWC from '../src/image/lut/wwwc'
import Index3D from '../src/geometry/index3d'

/**
 *
 * Created Date: 2020-01-19, 17:04:33 (zhenliang.sun)
 * Last Modified: 2020-02-15, 03:03:59 (zhenliang.sun)
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
const view = new View()

const canvas = document.querySelector('#cvs')

// const urls = [
//   'http://192.168.199.136:8887/1.2.840.113704.1.111.5560.1384995322.5910.dcm',
//   'http://192.168.199.136:8887/1.2.840.113704.1.111.5560.1384995322.5911.dcm',
//   'http://192.168.199.136:8887/1.2.840.113704.1.111.5560.1384995322.5912.dcm',
//   'http://192.168.199.136:8887/1.2.840.113704.1.111.5560.1384995323.5913.dcm',
//   'http://192.168.199.136:8887/1.2.840.113704.1.111.5560.1384995323.5914.dcm',
//   'http://192.168.199.136:8887/1.2.840.113704.1.111.5560.1384995323.5915.dcm',
//   'http://192.168.199.136:8887/1.2.840.113704.1.111.5560.1384995323.5916.dcm',
//   'http://192.168.199.136:8887/1.2.840.113704.1.111.5560.1384995324.5917.dcm',
//   'http://192.168.199.136:8887/1.2.840.113704.1.111.5560.1384995324.5918.dcm',
//   'http://192.168.199.136:8887/1.2.840.113704.1.111.5560.1384995324.5919.dcm'
// ]
// const slices = [1, 2, 3, 4, 5, 6, 7, 8, 9]
// canvas.width = 512
// canvas.height = 512
// view.setWWWC(1500, 700)

const urls = [
  'http://192.168.199.136:8887/1.dcm',
  'http://192.168.199.136:8887/2.dcm',
  'http://192.168.199.136:8887/3.dcm',
  'http://192.168.199.136:8887/4.dcm',
  'http://192.168.199.136:8887/5.dcm',
  'http://192.168.199.136:8887/6.dcm'
]
const slices = [108, 99, 90, 81, 72]
canvas.width = 256
canvas.height = 256
view.setWWWC(844, 424)

const buffer = new ImageData(canvas.width, canvas.height)
let ready = false

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
  drawBuffer()
})

view.colourMap = 'normal'

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

  console.log(deltaX, deltaY)
  const currentWWWC = view.currentWWWC
  view.setWWWC(currentWWWC.width + deltaX, currentWWWC.center + deltaY)

  lastX = e.pageX
  lastY = e.pageY
})

let currentSliceIndex = 0
canvas.addEventListener('mousewheel', e => {
  currentSliceIndex = Math.max(
    0,
    Math.min(currentSliceIndex + Math.sign(e.wheelDelta), slices.length - 1)
  )
  view.sliceIndex = new Index3D(0, 0, slices[currentSliceIndex])
})

setTimeout(() => {
  ready = true
  view.sliceIndex = new Index3D(0, 0, slices[0])
}, 2000)

function drawBuffer() {
  if (!ready) {
    return
  }
  view.generateImageData(buffer)
  canvas.getContext('2d').putImageData(buffer, 0, 0)
}
