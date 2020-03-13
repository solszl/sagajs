import log from 'loglevel'
import ViewManager from '../src/manager/viewManager'
import ResetCommand from '../src/tools/command/resetCommand'
import ZoomCommand from '../src/tools/command/zoomCommand'
import ViewContainer from '../src/view/viewContainer'
import MoveCommand from '../src/tools/command/moveCommand'

/**
 *
 * Created Date: 2020-02-25, 17:32:51 (zhenliang.sun)
 * Last Modified: 2020-03-14, 07:10:12 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

log.setDefaultLevel(1)

// const stage = new Konva.Stage({
//   container: 'container',
//   width: 800,
//   height: 300
// })

// const layer = new ToolsLayer('tools')
// layer.on('click', e => {
//   console.log('click')
// })

// const circle = new Konva.Circle({
//   x: 100,
//   y: 100,
//   radius: 30,
//   fill: 'red',
//   listening: true
// })

// circle.on('click', e => {
//   console.log('circle')
// })
// layer.add(circle)
// stage.add(layer)
// // layer.drawScene()

// console.log(layer)

// stage.on(INTERNAL_EVENT_ENUM.POSITION_CHANGE, e => {
//   console.log(e)
// })

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

const stage = viewContainer.stage
document.querySelector('#tool-scroll').addEventListener('click', () => {
  alert(123)
})
document.querySelector('#tool-zoom').addEventListener('click', () => {
  new ZoomCommand(stage).execute()
})
document.querySelector('#tool-wwwc').addEventListener('click', () => {
  alert(123)
})
document.querySelector('#tool-move').addEventListener('click', () => {
  new MoveCommand(stage).execute()
})
document.querySelector('#tool-length').addEventListener('click', () => {
  alert(123)
})
document.querySelector('#tool-probe').addEventListener('click', () => {
  alert(123)
})
document.querySelector('#tool-areaCT').addEventListener('click', () => {
  alert(123)
})
document.querySelector('#tool-angle').addEventListener('click', () => {
  alert(123)
})
document.querySelector('#tool-missed').addEventListener('click', () => {
  alert(123)
})
document.querySelector('#tool-reverse').addEventListener('click', () => {
  alert(123)
})
document.querySelector('#tool-hide').addEventListener('click', () => {
  alert(123)
})
document.querySelector('#tool-link').addEventListener('click', () => {
  alert(123)
})
document.querySelector('#tool-play').addEventListener('click', () => {
  alert(123)
})
document.querySelector('#tool-reset').addEventListener('click', () => {
  new ResetCommand(stage).execute()
})
document.querySelector('#tool-flip').addEventListener('click', () => {})
