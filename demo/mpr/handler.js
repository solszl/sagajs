import MPR3D from './mpr3d'
import { Stage, Layer } from 'konva/lib/'
import { Image } from 'konva/lib/shapes/Image'
import SimpleView from '../../src/view/simpleView'

/**
 *
 * Created Date: 2020-04-27, 15:05:29 (zhenliang.sun)
 * Last Modified: 2020-05-11, 03:11:49 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */
let mprIsOpen = false
let mpr
let angleX = 0
let angleY = 0
let angleZ = 0
// .throttle(30)
export const addEvent = () => {
  document.querySelector('#left-axis').addEventListener('input', leftAxisChange)
  document.querySelector('#left-coronal').addEventListener('input', leftCoronalChange)
  document.querySelector('#left-sagittal').addEventListener('input', leftSagittalChange)
  document.querySelector('#left-angle').addEventListener('input', leftAngleChange)

  document.querySelector('#middle-coronal').addEventListener('input', middleCoronalChange)
  document.querySelector('#middle-sagittal').addEventListener('input', middleSagittalChange)
  document.querySelector('#middle-axis').addEventListener('input', middleAxisChange)
  document.querySelector('#middle-angle').addEventListener('input', middleAngleChange)

  document.querySelector('#right-coronal').addEventListener('input', rightCoronalChange)
  document.querySelector('#right-sagittal').addEventListener('input', rightSagittalChange)
  document.querySelector('#right-axis').addEventListener('input', rightAxisChange)
  document.querySelector('#right-angle').addEventListener('input', rightAngleChange)

  document.querySelector('#btnMPR').addEventListener('click', openMPR)
}

const leftAxisChange = e => {
  gotoPage(~~e.target.value)

  document.querySelector('#middle-axis').value = e.target.value
  document.querySelector('#right-axis').value = e.target.value
  makeMPR()
}

const leftCoronalChange = e => {
  document.querySelector('#middle-coronal').value = e.target.value
  document.querySelector('#right-coronal').value = e.target.value
  mprIsOpen && makeMPR()
}

const leftSagittalChange = e => {
  document.querySelector('#middle-sagittal').value = e.target.value
  document.querySelector('#right-sagittal').value = e.target.value
  mprIsOpen && makeMPR()
}

const leftAngleChange = e => {
  // 轴状位视图旋转会影响到，蓝线和黄线， 对应的黄线和蓝线旋转对应的角度
  // // 矢状位
  // angleY = e.target.value
  // // 冠状位
  // angleZ = e.target.value

  angleX = e.target.value
  mprIsOpen && makeMPR()
}

const middleCoronalChange = e => {
  document.querySelector('#left-coronal').value = e.target.value
  document.querySelector('#right-coronal').value = e.target.value
  mprIsOpen && makeMPR()
}

const middleSagittalChange = e => {
  document.querySelector('#left-sagittal').value = e.target.value
  document.querySelector('#right-sagittal').value = e.target.value
  mprIsOpen && makeMPR()
}

const middleAxisChange = e => {
  gotoPage(~~e.target.value)
  document.querySelector('#left-axis').value = e.target.value
  document.querySelector('#right-axis').value = e.target.value
  mprIsOpen && makeMPR()
}

const middleAngleChange = e => {
  // 矢状位视图下，旋转角度会影响 蓝线和紫线 对应冠状位和轴状位
  // 轴状位
  // angleX = e.target.value
  // // 冠状位
  // angleZ = e.target.value
  angleY = e.target.value
  mprIsOpen && makeMPR()
}

const rightCoronalChange = e => {
  document.querySelector('#left-coronal').value = e.target.value
  document.querySelector('#middle-coronal').value = e.target.value
  mprIsOpen && makeMPR()
}

const rightSagittalChange = e => {
  document.querySelector('#left-sagittal').value = e.target.value
  document.querySelector('#middle-sagittal').value = e.target.value
  mprIsOpen && makeMPR()
}

const rightAxisChange = e => {
  gotoPage(~~e.target.value)
  document.querySelector('#left-axis').value = e.target.value
  document.querySelector('#middle-axis').value = e.target.value
  mprIsOpen && makeMPR()
}

const rightAngleChange = e => {
  // 冠状位视图下旋转影响 黄线和紫线， 对应矢状位和轴状位
  // 轴状位
  // angleX = e.target.value
  // angleY = e.target.value
  angleZ = e.target.value
  mprIsOpen && makeMPR()
}

const gotoPage = page => {
  // 前后增加
  const sliceIndex = sdk.currentView.view.sliceIndex.clone()
  const currentValue = page + 1
  sliceIndex.k = currentValue
  sdk.currentView.view.sliceIndex = sliceIndex
}

const makeMPR = () => {
  const centerX = document.querySelector('#left-sagittal').value
  const centerY = document.querySelector('#left-coronal').value
  const centerZ = document.querySelector('#left-axis').value

  mpr.make(centerX, centerY, centerZ, angleX, angleY, angleZ)
  mpr.makeAxisImage(angleX, angleY)
  mpr.makeSagittalImage(angleY, angleZ)
  mpr.makeCoronalImage(angleX, angleZ)
}

const openMPR = async e => {
  mprIsOpen = true

  const config = {}

  const size = {}
  size.column = 512
  size.row = 512
  size.slice = 249
  config.size = size

  // 图像原始数据
  config.images = sdk.currentView.view.image.pixelBuffer
  config.thickness = sdk.currentView.view.image.metaData.thickness
  // 查找表
  config.lut = sdk.currentView.view.windowLut
  // 窗宽窗位
  config.colourMap = sdk.currentView.view.colourMap.colour

  const spacing = {}
  const { columnSpacing, rowSpacing, sliceSpacing } = sdk.currentView.view.image.geometry.spacing
  spacing.spX = columnSpacing
  spacing.spY = rowSpacing
  spacing.spZ = sliceSpacing
  config.spacing = spacing

  mpr = new MPR3D(config)
  mpr.on('render', async e => {
    // 根据渲染出来的不同的层面，在不同容器内进行渲染
    let axisImageData
    let sagittalImageData
    let coronalImageData
    switch (e.type) {
      case 'axis':
        axisImageData = new ImageData(e.width, e.height)
        console.time('轴状位 加工数据')
        generateImageData(axisImageData, e.buffer)
        console.timeEnd('轴状位 加工数据')
        leftView.setImage(await createImageBitmap(axisImageData))
        leftView.render()
        break
      case 'sagittal':
        sagittalImageData = new ImageData(e.width, e.height)
        console.time('矢状位 加工数据')
        generateImageData(sagittalImageData, e.buffer)
        console.timeEnd('矢状位 加工数据')
        middleView.setImage(await createImageBitmap(sagittalImageData))
        // middleView.imageFit()
        middleView.render()
        break
      case 'coronal':
        coronalImageData = new ImageData(e.width, e.height)
        console.time('冠状位 加工数据')
        generateImageData(coronalImageData, e.buffer)
        console.timeEnd('冠状位 加工数据')
        rightView.setImage(await createImageBitmap(coronalImageData))
        rightView.render()
        break
      default:
        break
    }
  })

  console.log(config)

  window.mpr = mpr
  window.middleView = middleView

  makeMPR()
}
const generateImageData = (imageData, originBuffer) => {
  const lut = sdk.currentView.view.windowLut
  const colourMap = sdk.currentView.view.colourMap.colour

  let pixelIndex = 0
  let bufferIndex = 0
  while (pixelIndex < originBuffer.length) {
    const pixelData = lut.getValue(originBuffer[pixelIndex])
    imageData.data[bufferIndex] = colourMap.red[pixelData] // red
    imageData.data[bufferIndex + 1] = colourMap.green[pixelData] // green
    imageData.data[bufferIndex + 2] = colourMap.blue[pixelData] // blue
    imageData.data[bufferIndex + 3] = 0xff // alpha
    pixelIndex += 1
    bufferIndex += 4
  }
}

let leftView
let middleView
let rightView
export const initImageContainer = () => {
  leftView = new SimpleView('content-left')
  // 显示视图舞台
  middleView = new SimpleView('content-middle')
  // middleView.stage.rotation(90)
  rightView = new SimpleView('content-right')
}
