import MPR3D from './mpr3d'

/**
 *
 * Created Date: 2020-04-27, 15:05:29 (zhenliang.sun)
 * Last Modified: 2020-04-27, 17:46:38 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */
let mprIsOpen = false
let mpr
export const addEvent = () => {
  document
    .querySelector('#left-axis')
    .addEventListener('input', leftAxisChange.throttle(30))
  document
    .querySelector('#left-coronal')
    .addEventListener('input', leftCoronalChange.throttle(30))
  document
    .querySelector('#left-sagittal')
    .addEventListener('input', leftSagittalChange.throttle(30))
  document
    .querySelector('#left-angle')
    .addEventListener('input', leftAngleChange.throttle(30))

  document
    .querySelector('#middle-coronal')
    .addEventListener('input', middleCoronalChange.throttle(30))
  document
    .querySelector('#middle-sagittal')
    .addEventListener('input', middleSagittalChange.throttle(30))
  document
    .querySelector('#middle-axis')
    .addEventListener('input', middleAxisChange.throttle(30))
  document
    .querySelector('#middle-angle')
    .addEventListener('input', middleAngleChange.throttle(30))

  document
    .querySelector('#right-coronal')
    .addEventListener('input', rightCoronalChange.throttle(30))
  document
    .querySelector('#right-sagittal')
    .addEventListener('input', rightSagittalChange.throttle(30))
  document
    .querySelector('#right-axis')
    .addEventListener('input', rightAxisChange.throttle(30))
  document
    .querySelector('#right-angle')
    .addEventListener('input', rightAngleChange.throttle(30))

  document.querySelector('#btnMPR').addEventListener('click', openMPR)
}

const leftAxisChange = e => {
  // 前后增加
  const sliceIndex = sdk.currentView.view.sliceIndex.clone()
  const currentValue = ~~e.target.value + 1
  sliceIndex.k = currentValue
  sdk.currentView.view.sliceIndex = sliceIndex

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
  document.querySelector('#left-axis').value = e.target.value
  document.querySelector('#right-axis').value = e.target.value
  mprIsOpen && makeMPR()
}

const middleAngleChange = e => {
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
  document.querySelector('#left-axis').value = e.target.value
  document.querySelector('#middle-axis').value = e.target.value
  mprIsOpen && makeMPR()
}

const rightAngleChange = e => {
  mprIsOpen && makeMPR()
}

const makeMPR = () => {
  const x = document.querySelector('#left-sagittal').value
  const y = document.querySelector('#left-coronal').value
  const z = document.querySelector('#left-axis').value
  const a = document.querySelector('#left-angle').value
  const b = document.querySelector('#middle-angle').value
  const c = document.querySelector('#right-angle').value

  mpr.make(x, y, z, a, b, c)
}

const openMPR = e => {
  mprIsOpen = true

  const config = {}
  config.column = 512
  config.row = 512
  config.slice = 241

  // 图像原始数据
  config.images = sdk.currentView.view.image.pixelBuffer
  // 查找表
  config.lut = sdk.currentView.view.windowLut
  // 窗宽窗位
  config.colourMap = sdk.currentView.view.colourMap.colour

  const spacing = {}
  const {
    columnSpacing,
    rowSpacing,
    sliceSpacing
  } = sdk.currentView.view.image.geometry.spacing
  spacing.spX = columnSpacing
  spacing.spY = rowSpacing
  spacing.spZ = sliceSpacing
  config.spacing = spacing

  mpr = new MPR3D(config)
  mpr.on('render', e => {
    // 根据渲染出来的不同的层面，在不同容器内进行渲染
  })

  console.log(config)
}
