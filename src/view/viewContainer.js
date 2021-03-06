import { Group, Layer, Stage } from 'konva/lib'
import { Image } from 'konva/lib/shapes/Image'
import log from 'loglevel'
import { COLOUR_ENUM } from '../constants/colour-enum'
import { INTERNAL_EVENT_ENUM } from '../constants/internal-event'
import { SLICE_EVENT_ENUM } from '../constants/slice-event'
import Index3D from '../geometry/index3d'
import './../utils/limit'
import View from './view'
/**
 *
 * Created Date: 2020-02-25, 17:21:02 (zhenliang.sun)
 * Last Modified: 2020-04-26, 20:43:46 (zhenliang.sun)
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
    this.originSize = { width: 512, height: 512 }
    // 是否再容器之间共享图片数据， 可能存在前后片为同一套数据的情况、或者多分屏的情况
    this.shareImageData = false
    this.readyToShow = false

    // 显示视图舞台
    this.stage = new Stage({
      container: root
    })

    this.stage.on(INTERNAL_EVENT_ENUM.RESET, () => this.resize())
    this.stage.on(INTERNAL_EVENT_ENUM.POSITION_CHANGE, e => {})
    this.stage.on(INTERNAL_EVENT_ENUM.WWWC_CHANGE, e => {
      const { width: deltaWidth, center: deltaCenter } = e.deltaWWWC
      const { width, center } = this.view.currentWWWC

      this.view.setWWWC(width + deltaWidth, center + deltaCenter)
    })

    // 逻辑视图
    this.view = new View()
    this.view.on(SLICE_EVENT_ENUM.COLOUR_MAP_CHANGED, e => {
      this.draw()
    })
    this.view.on(SLICE_EVENT_ENUM.SLICE_CHANGED, e => {
      this.draw()
    })
    this.view.on(SLICE_EVENT_ENUM.WINDOW_WWWC_CHANGED, e => {
      this.draw()
    })
    this.view.on(INTERNAL_EVENT_ENUM.FIRST_SLICE_LOAD_COMPLETED, async () => {
      log.info('first image load completed. prepare for display.')
      this.dynamicLayer = new Layer({
        id: 'dynamicLayer'
      })

      const { column, row } = this.view.image.geometry.size
      this.originSize = { width: column, height: row }

      this.dicomImage = new Image({ id: 'dicomImage' })
      this.dynamicGroup = new Group({ id: 'dynamicGroup' })
      this.dynamicGroup.add(this.dicomImage)
      this.dynamicLayer.add(this.dynamicGroup)
      const { width, height } = this.originSize
      this.imageData = this.dicomImage
        .getContext()
        .createImageData(width, height)

      this.view.colourMap = COLOUR_ENUM.NORMAL
      this.view.sliceIndex = new Index3D(0, 0, 1)

      this.stage.add(this.dynamicLayer)

      this.readyToShow = true
      // 重置一下舞台大小
      this.resize()
    })
  }

  resize(width, height) {
    if (this.stage.width() === width && this.stage.height() === height) {
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
    const { width: originWidth, height: originHeight } = this.originSize
    const scale = Math.min(width / originWidth, height / originHeight)
    this.stage.scale({ x: scale, y: scale })
    this.stage.fire(INTERNAL_EVENT_ENUM.ZOOM_CHANGE, { scale })

    const position = { x: width / 2, y: width / 2 }
    this.stage.position(position)
    this.stage.fire(INTERNAL_EVENT_ENUM.POSITION_CHANGE, { position })

    const offsetX = width / scale / 2
    const offsetY = height / scale / 2
    this.stage.offset({ x: offsetX, y: offsetY })

    this.draw()
  }

  async draw() {
    if (this.readyToShow === false) {
      return
    }

    // 构建图像数据
    this.view.generateImageData(this.imageData)
    this.dicomImage.image(await createImageBitmap(this.imageData))
    this.stage.batchDraw()
  }

  setURLs(urls) {
    this.view.urls = urls
  }

  destroy() {
    this.view.destroy()
    this.view = null

    this.stage.destroy()
    this.stage = null

    this.imageData = null
    this.dynamicLayer.destroy()
    this.dicomImage.destroy()
    this.dynamicGroup.destroy()
  }

  getViewInfo() {
    return this.view.image.metaData
  }
}

export default ViewContainer
