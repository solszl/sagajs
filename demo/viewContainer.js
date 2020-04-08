import log from 'loglevel'
import SDK from '../src/sdk'
import AngleCommand from '../src/tools/command/angleCommand'
import EllipseCommand from '../src/tools/command/ellipseCommand'
import LengthCommand from '../src/tools/command/lengthCommand'
import MoveCommand from '../src/tools/command/moveCommand'
import MPRCommand from '../src/tools/command/mprCommand'
import PlaybackCommand from '../src/tools/command/playbackCommand'
import ProbeCommand from '../src/tools/command/probeCommand'
import RACommand from '../src/tools/command/raCommand'
import ResetCommand from '../src/tools/command/resetCommand'
import ScrollCommand from '../src/tools/command/scrollCommand'
import WWWCCommand from '../src/tools/command/wwwcCommand'
import ZoomCommand from '../src/tools/command/zoomCommand'
import ViewContainer from '../src/view/viewContainer'

/**
 *
 * Created Date: 2020-02-25, 17:32:51 (zhenliang.sun)
 * Last Modified: 2020-04-08, 16:44:15 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

log.setDefaultLevel(1)

const urls = []
for (let i = 1; i < 40; i += 1) {
  urls.push(
    // `http://127.0.0.1:8887/1.2.840.113619.2.278.3.2831172146.890.1539296548.557.${i}`
    `http://127.0.0.1:8887/${i}`
  )
}

const sdk = new SDK()

const viewContainer = new ViewContainer('container')
viewContainer.setURLs(urls)

const { viewManager, toolManager } = sdk
viewManager.addView(viewContainer)

document.querySelector('#tool-scroll').addEventListener('click', () => {
  toolManager.command = new ScrollCommand()
})
document.querySelector('#tool-zoom').addEventListener('click', () => {
  toolManager.command = new ZoomCommand()
})
document.querySelector('#tool-wwwc').addEventListener('click', () => {
  toolManager.command = new WWWCCommand()
})
document.querySelector('#tool-move').addEventListener('click', () => {
  toolManager.command = new MoveCommand()
})
document.querySelector('#tool-length').addEventListener('click', () => {
  toolManager.command = new LengthCommand()
})
document.querySelector('#tool-probe').addEventListener('click', () => {
  toolManager.command = new ProbeCommand()
})
document.querySelector('#tool-areaCT').addEventListener('click', () => {
  toolManager.command = new EllipseCommand()
})
document.querySelector('#tool-angle').addEventListener('click', () => {
  toolManager.command = new AngleCommand()
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
  toolManager.command = new PlaybackCommand({ framerate: 20 })
})
document.querySelector('#tool-reset').addEventListener('click', () => {
  toolManager.command = new ResetCommand()
})
document.querySelector('#tool-flip').addEventListener('click', () => {})
document.querySelector('#tool-rotate').addEventListener('click', () => {
  toolManager.command = new RACommand()
})
document.querySelector('#tool-mpr').addEventListener('click', () => {
  toolManager.command = new MPRCommand()
})
