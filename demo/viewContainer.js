import ViewContainer from '../src/view/viewContainer'
import ViewManager from '../src/manager/viewManager'
import log from 'loglevel'
import Konva from 'konva'
import TXLayer from '../src/component/layer'
import ToolsLayer from '../src/view/toolsLayer'
import MoveCommand from '../src/tools/command/moveCommand'
import { INTERNAL_EVENT_ENUM } from '../src/constants/internal-event'

/**
 *
 * Created Date: 2020-02-25, 17:32:51 (zhenliang.sun)
 * Last Modified: 2020-03-10, 01:26:04 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

log.setDefaultLevel(1)

const stage = new Konva.Stage({
  container: 'container',
  width: 800,
  height: 300
})

const layer = new ToolsLayer('tools')
layer.on('click', e => {
  console.log('click')
})

const circle = new Konva.Circle({
  x: 100,
  y: 100,
  radius: 30,
  fill: 'red',
  listening: true
})

circle.on('click', e => {
  console.log('circle')
})
layer.add(circle)
stage.add(layer)
// layer.drawScene()

console.log(layer)

stage.on(INTERNAL_EVENT_ENUM.POSITION_CHANGE, e => {
  console.log(e)
})

const command = new MoveCommand(stage)
command.execute()

// const urls = []
// for (let i = 1; i < 10; i += 1) {
//   urls.push(`http://127.0.0.1:8887/${i}`)
// }

// const viewContainer = new ViewContainer('container')
// viewContainer.setURLs(urls)
// window.aa = viewContainer

// const manager = new ViewManager()
// manager.addView(viewContainer)
// manager.activeView('container')
