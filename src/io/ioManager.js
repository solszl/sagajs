import LoadContext from './strategy/loadContext'
import DynamicStrategy from './strategy/dynamicStrategy'
import SequenceStrategy from './strategy/SequenceStrategy'
import Loader from './loader'
import Cache from './cache'
import { LOAD_EVENT_ENUM } from '../constants/loader-event'
import { parse } from './process/dataProcess'

/**
 *
 * Created Date: 2020-01-19, 01:52:21 (zhenliang.sun)
 * Last Modified: 2020-01-20, 21:15:59 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

/**
 * io管理类
 *
 * @export
 * @class IOManager
 * @author zhenliang.sun
 */
export default class IOManager {
  constructor(option = {}) {
    // 创建上下文
    this.context = new LoadContext()
    this.context.strategy = option.dynamic
      ? new DynamicStrategy()
      : new SequenceStrategy()

    // 创建loader
    this.loader = new Loader()

    // 创建缓存
    this.cache = new Cache()

    // 添加事件监听
    this.loader.on(
      LOAD_EVENT_ENUM.ITEM_LOAD_COMPLETE,
      this._itemLoadComplete.bind(this)
    )
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
    if (this.context.isAllComplete()) {
      this._allLoadComplete()
      return
    }

    const { buffer, imageId } = e
    this.cache.setCache(imageId, parse(buffer))

    this._next()
  }

  _allLoadComplete(e) {
    console.log('all complete')
  }

  _next() {
    const task = this.context.pick()
    this.loader.load(task.imageId)
  }
}
