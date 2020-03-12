import Konva from 'konva'
import log from 'loglevel'
import TXLayer from '../component/layer'
import { COLOUR_ENUM } from '../constants/colour-enum'
import { INTERNAL_EVENT_ENUM } from '../constants/internal-event'
import { SLICE_EVENT_ENUM } from '../constants/slice-event'
import Index3D from '../geometry/index3d'
import ToolsLayer from './toolsLayer'
import View from './view'
/**
 *
 * Created Date: 2020-02-25, 17:21:02 (zhenliang.sun)
 * Last Modified: 2020-03-12, 21:46:42 (zhenliang.sun)
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
    this.imageData = null
    this.scale = 1
    this.originSize = { width: 512, height: 512 }
    // 是否再容器之间共享图片数据， 可能存在前后片为同一套数据的情况、或者多分屏的情况
    this.shareImageData = false
    this.readyToShow = false

    // 显示视图舞台
    this.stage = new Konva.Stage({
      container: root
    })

    this.stage.on(INTERNAL_EVENT_ENUM.POSITION_CHANGE, pos => {
      const { x, y } = pos
      this.imageContainer.move(x, y)
      this.draw()
    })

    // 逻辑视图
    this.view = new View()
    this.view.on(SLICE_EVENT_ENUM.COLOUR_MAP_CHANGED, e => {})
    this.view.on(SLICE_EVENT_ENUM.SLICE_CHANGED, e => {})
    this.view.on(SLICE_EVENT_ENUM.WINDOW_WWWC_CHANGED, e => {})
    this.view.on(INTERNAL_EVENT_ENUM.FIRST_SLICE_LOAD_COMPLETED, async () => {
      log.info('first image load completed. prepare for display.')
      // 2个层， 一个静态层、一个动态层
      // 静态层包含信息：1，四角信息
      // 动态层包含信息：1, 图像文件、2，contour、3，长度测量工具、4，角度测量工具、5，区域CT工具、6，长短径工具、7，方位信息
      this.staticLayer = new Konva.Layer({
        name: 'staticLayer'
      })

      this.dynamicLayer = new Konva.Layer({
        name: 'dynamicLayer'
      })

      const { column, row } = this.view.image.geometry.size
      this.originSize.width = column
      this.originSize.height = row

      this.dicomImage = new Konva.Image()
      this.dynamicLayer.add(this.dicomImage)
      const { width, height } = this.originSize
      this.imageData = this.dicomImage.getContext().createImageData(width, height)

      this.view.colourMap = COLOUR_ENUM.NORMAL
      this.view.sliceIndex = new Index3D(0, 0, 1)

      this.stage.add(this.staticLayer)
      this.stage.add(this.dynamicLayer)

      this.readyToShow = true
      // 重置一下舞台大小
      this.resize()
    })
  }

  resize(width, height) {
    if (this.stage.width === width && this.stage.height === height) {
      return
    }

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

    // 适配窗口大小进行缩放
    this._scaleToFit()
    this.draw()
  }

  async draw() {
    if (this.readyToShow === false) {
      return
    }

    // 构建图像数据
    this.view.generateImageData(this.imageData)
    this.dicomImage.image(await createImageBitmap(this.imageData))
    this.stage.draw()
    // image container 进行数据呈现
    // this.imageContainer.setImageData(this.imageData)

    // this.aaa.image(await createImageBitmap(this.imageData))
  }

  setURLs(urls) {
    this.view.urls = urls
  }

  _scaleToFit() {
    const stageWidth = this.stage.width()
    const stageHeight = this.stage.height()

    const { width, height } = this.originSize

    const scale = Math.min(stageWidth / width, stageHeight / height)

    const newWidth = scale > 1 ? width * scale : height * scale
    const newHeight = scale > 1 ? height * scale : width * scale
    this.staticLayer.size({ width: stageWidth, height: stageHeight })
    this.dynamicLayer.size({ width: newWidth, height: newHeight })
    // this.dynamicLayer.position({ x: stageWidth - newWidth >> 1, y: stageHeight - newHeight >> 1 })
    this.dynamicLayer.position({ x: 0, y: 0 })
    this.dicomImage.size({ width: newWidth, height: newHeight })

    // TODO: 填充工具 toolsContainer
  }
}

export default ViewContainer
