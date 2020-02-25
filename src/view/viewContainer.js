import View from './view'
import Konva from 'konva'
import { SLICE_EVENT_ENUM } from '../constants/slice-event'
import { INTERNAL_EVENT_ENUM } from '../constants/internal-event'
/**
 *
 * Created Date: 2020-02-25, 17:21:02 (zhenliang.sun)
 * Last Modified: 2020-02-26, 00:19:55 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

/**
 * 视图、工具容器
 *
 * @class ViewContainer
 * @author zhenliang.sun
 */
class ViewContainer {
  constructor(root) {
    this.rootId = root
    this.imageContainer = null
    this.toolsContainer = null
    this.imageData = null

    // 显示视图舞台
    this.stage = new Konva.Stage({
      container: root
    })

    // 逻辑视图
    this.view = new View()
    this.view.on(SLICE_EVENT_ENUM.COLOUR_MAP_CHANGED, e => {})
    this.view.on(SLICE_EVENT_ENUM.SLICE_CHANGED, e => {})
    this.view.on(SLICE_EVENT_ENUM.WINDOW_WWWC_CHANGED, e => {})
    this.view.on(INTERNAL_EVENT_ENUM.FIRST_SLICE_LOAD_COMPLETED, () => {
      // 需要向舞台添加一个图像容器
      this.imageContainer = new Konva.Layer({ name: 'image' })
      this.stage.add(this.imageContainer)

      // 向舞台添加一个工具容器
      this.toolsContainer = new Konva.Layer({ name: 'tools' })
      this.stage.add(this.toolsContainer)

      const { column, row } = this.view.image.geometry.size
      this.imageData = this.imageContainer
        .getContext()
        .createImageData(column, row)

      // 重置一下舞台大小
      this.resize()
    })
  }

  resize(width, height) {
    if (!width && !height) {
      const rootElement = document.querySelector(`#${this.rootId}`)
      const rect = rootElement.getBoundingClientRect()
      width = rect.width
      height = rect.height
    }

    this.stage.setAttrs({
      width,
      height
    })
  }

  setURLs(urls) {
    this.view.urls = urls
  }
}

export default ViewContainer
