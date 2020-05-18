import { delay } from 'nanodelay'
import IEvent from '../component/event'
import { LOAD_EVENT_ENUM } from '../constants/loader-event'
import Cache from './cache'
import Loader from './loader'
import { parse } from './process/dataProcess'
import DynamicStrategy from './strategy/dynamicStrategy'
import LoadContext from './strategy/loadContext'
import SequenceStrategy from './strategy/SequenceStrategy'

/**
 *
 * Created Date: 2020-01-19, 01:52:21 (zhenliang.sun)
 * Last Modified: 2020-04-16, 21:55:04 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

/**
 * io管理类
 *
 * @export
 * @class IO
 * @author zhenliang.sun
 */
export default class IO extends IEvent {
  constructor(option = {}) {
    super()
    // 创建上下文
    this.context = new LoadContext()
    this.context.strategy = option.dynamic
      ? new DynamicStrategy()
      : new SequenceStrategy()

    // 创建loader
    this.loaders = []
    const count = option.workerCount || 2

    for (let i = 0; i < count; i += 1) {
      const ldr = new Loader()
      // 添加事件监听
      ldr.on(
        LOAD_EVENT_ENUM.ITEM_LOAD_COMPLETE,
        this._itemLoadComplete.bind(this)
      )
      this.loaders.push(ldr)
    }

    // 创建缓存
    this.cache = new Cache()

    this.itemLoadCallBK = null
  }

  setUrls(urls, autoLoad = true) {
    this.context.install(urls)
    if (autoLoad) {
      this.startLoad()
    }
  }

  startLoad() {
    this._next()
  }

  hoisting(imageId) {
    this.context.hoisting(imageId)
  }

  _itemLoadComplete(e) {
    const { buffer, imageId } = e
    this.cache.setCache(imageId, parse(buffer))
    this.emit(LOAD_EVENT_ENUM.ITEM_LOAD_COMPLETE, e)

    const someLoaderWorking = this.loaders.some(ldr => ldr.isLoading === true)

    if (!someLoaderWorking && this.context.isAllComplete()) {
      this._allLoadComplete()
      return
    }

    this._next()
  }

  _allLoadComplete(e) {
    console.log('all complete')
  }

  async _next() {
    // for CPU performance. from: 10~14% to 7~8%
    // 理论上，间隔越大CPU使用率越低，调整间隔500ms， cpu使用率越在2%
    await delay(50)
    this.loaders
      .filter(loader => loader.isLoading === false)
      .forEach(async ldr => {
        const task = await this.context.pick()
        if (task) {
          ldr.load(task.imageId)
        }
      })
  }

  destroy() {
    const events = this.emitter.events
    for (const key in events) {
      delete events[key]
    }

    this.context = null
    this.cache.clear()

    this.loader.destroy()
    this.loader = null
  }
}
