/**
 *
 * Created Date: 2020-04-01, 21:13:10 (zhenliang.sun)
 * Last Modified: 2020-04-07, 22:08:10 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

import BaseCommand from './baseCommand'
import log from 'loglevel'

/**
 * 播放命令， 再次点击就是停止
 *
 * @class PlaybackCommand
 * @extends {BaseCommand}
 * @author zhenliang.sun
 */
class PlaybackCommand extends BaseCommand {
  constructor(config = { framerate: 20 }) {
    super()
    this._type = 'PlaybackCommand'

    const { framerate } = config
    this.framerate = framerate || 20
  }

  execute() {
    super.execute()

    if ((this.view.playIntervalId || 0) === 0) {
      this._play()
    } else {
      this._stop()
    }
  }

  _play() {
    this.view.playIntervalId = setInterval(() => {
      const sliceIndex = this.view.sliceIndex.clone()
      const { slice: total } = this.view.image.geometry.size
      sliceIndex.k += 1
      sliceIndex.k %= total
      sliceIndex.k = Math.max(1, sliceIndex.k)
      this.view.sliceIndex = sliceIndex
    }, 1000 / this.framerate)
  }

  _stop() {
    clearInterval(this.view.playIntervalId)
    this.view.playIntervalId = 0
  }
}

export default PlaybackCommand
