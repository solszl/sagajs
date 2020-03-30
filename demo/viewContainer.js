import log from 'loglevel'
import ViewManager from '../src/manager/viewManager'
import AngleCommand from '../src/tools/command/angleCommand'
import EllipseCommand from '../src/tools/command/ellipseCommand'
import LengthCommand from '../src/tools/command/lengthCommand'
import MoveCommand from '../src/tools/command/moveCommand'
import MPRCommand from '../src/tools/command/mprCommand'
import ProbeCommand from '../src/tools/command/probeCommand'
import RACommand from '../src/tools/command/raCommand'
import ResetCommand from '../src/tools/command/resetCommand'
import WWWCCommand from '../src/tools/command/wwwcCommand'
import ZoomCommand from '../src/tools/command/zoomCommand'
import ViewContainer from '../src/view/viewContainer'
import ScrollCommand from '../src/tools/command/scrollCommand'

/**
 *
 * Created Date: 2020-02-25, 17:32:51 (zhenliang.sun)
 * Last Modified: 2020-03-30, 18:01:16 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

log.setDefaultLevel(1)

const urls = []
for (let i = 1; i < 30; i += 1) {
  urls.push(
    // `http://127.0.0.1:8887/1.2.840.113619.2.278.3.2831172146.890.1539296548.557.${i}`
    `http://127.0.0.1:8887/${i}`
  )
}

const viewContainer = new ViewContainer('container')
viewContainer.setURLs(urls)
window.aa = viewContainer

const manager = new ViewManager()
manager.addView(viewContainer)
manager.activeView('container')

document.querySelector('#tool-scroll').addEventListener('click', () => {
  new ScrollCommand(viewContainer).execute()
})
document.querySelector('#tool-zoom').addEventListener('click', () => {
  new ZoomCommand(viewContainer).execute()
})
document.querySelector('#tool-wwwc').addEventListener('click', () => {
  new WWWCCommand(viewContainer).execute()
})
document.querySelector('#tool-move').addEventListener('click', () => {
  new MoveCommand(viewContainer).execute()
})
document.querySelector('#tool-length').addEventListener('click', () => {
  new LengthCommand(viewContainer).execute()
})
document.querySelector('#tool-probe').addEventListener('click', () => {
  new ProbeCommand(viewContainer).execute()
})
document.querySelector('#tool-areaCT').addEventListener('click', () => {
  new EllipseCommand(viewContainer).execute()
})
document.querySelector('#tool-angle').addEventListener('click', () => {
  new AngleCommand(viewContainer).execute()
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
  new ResetCommand(viewContainer).execute()
})
document.querySelector('#tool-flip').addEventListener('click', () => {})
document.querySelector('#tool-rotate').addEventListener('click', () => {
  new RACommand(viewContainer).execute()
})
document.querySelector('#tool-mpr').addEventListener('click', () => {
  new MPRCommand(viewContainer).execute()
})
