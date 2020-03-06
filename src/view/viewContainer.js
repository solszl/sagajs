import Konva from 'konva'
import log from 'loglevel'
import { COLOUR_ENUM } from '../constants/colour-enum'
import { INTERNAL_EVENT_ENUM } from '../constants/internal-event'
import { SLICE_EVENT_ENUM } from '../constants/slice-event'
import Index3D from '../geometry/index3d'
import View from './view'
import TXLayer from '../component/layer'
/**
 *
 * Created Date: 2020-02-25, 17:21:02 (zhenliang.sun)
 * Last Modified: 2020-03-07, 03:26:18 (zhenliang.sun)
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

    // 是否再容器之间共享图片数据， 可能存在前后片为同一套数据的情况、或者多分屏的情况
    this.shareImageData = false
    this.readyToShow = false

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
      log.info('first image load completed. prepare for display.')
      // 需要向舞台添加一个图像容器
      this.imageContainer = new TXLayer('image')

      // 向舞台添加一个工具容器
      this.toolsContainer = new TXLayer('tools')

      const { column, row } = this.view.image.geometry.size
      this.imageContainer.originSize(column, row)
      this.imageData = this.imageContainer.context.createImageData(column, row)

      this.readyToShow = true

      this.view.colourMap = COLOUR_ENUM.NORMAL
      this.view.sliceIndex = new Index3D(0, 0, 1)

      window.fit = this.imageContainer
      window.stage = this.stage

      this.stage.add(this.imageContainer)
      this.stage.add(this.toolsContainer)
      // 重置一下舞台大小
      this.resize()
    })

    this.scale = 1
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

    this.imageContainer.size(width, height)

    // 适配窗口大小进行缩放
    this._scaleToFit()
    this.draw()
  }

  draw() {
    if (this.readyToShow === false) {
      return
    }

    // 构建图像数据
    this.view.generateImageData(this.imageData)
    // image container 进行数据呈现
    this.imageContainer.setImageData(this.imageData)
    this.imageContainer.draw()
  }

  setURLs(urls) {
    this.view.urls = urls
  }

  _scaleToFit() {
    const stageWidth = this.stage.width()
    const stageHeight = this.stage.height()

    const { width, height } = this.imageContainer.originImageSize

    const scale = Math.min(stageWidth / width, stageHeight / height)

    const newWidth = width * scale
    const newHeight = height * scale
    this.imageContainer.size(stageWidth, stageHeight)
    this.imageContainer.zoom(scale, scale)
    this.imageContainer.move(
      (stageWidth - newWidth) >> 1,
      (stageHeight - newHeight) >> 1
    )

    // TODO: 填充工具 toolsContainer
  }
}

export default ViewContainer
