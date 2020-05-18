/**
 *
 * Created Date: 2020-04-28, 15:39:46 (zhenliang.sun)
 * Last Modified: 2020-05-09, 17:59:24 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

import { Image } from 'konva/lib/shapes/Image'
import { Stage, Layer } from 'konva/lib'

class SimpleView {
  constructor(root) {
    this.rootId = root
    this.originSize = { width: 512, height: 512 }

    this.stage = new Stage({
      container: root
    })

    this.layer = new Layer()
    this.image = new Image()

    this.layer.add(this.image)
    this.stage.add(this.layer)
    this.resize()
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

    const position = { x: width / 2, y: width / 2 }
    this.stage.position(position)

    const offsetX = width / scale / 2
    const offsetY = height / scale / 2
    this.stage.offset({ x: offsetX, y: offsetY })
  }

  render() {
    this.stage.batchDraw()
  }

  setImage(bitmapImage) {
    this.image.image(bitmapImage)
  }

  imageFit() {
    let scale = 1
    if (this.image.getHeight() > 512) {
      scale = 512 / this.image.getHeight()
    } else if (this.image.getWidth() > 512) {
      scale = 512 / this.image.getWidth()
    }

    if (scale === 1) {
      return
    }
    this.image.scale({ x: scale, y: scale })
    this.image.x((Math.max(this.image.getWidth(), this.stage.getWidth()) - Math.min(this.image.getWidth(), this.stage.getWidth())) >> 1)
    this.image.y((Math.max(this.image.getHeight(), this.stage.getHeight()) - Math.min(this.image.getHeight(), this.stage.getHeight())) >> 1)
    // this.image.offsetX(this.image.getWidth() >> 1)
    // this.image.offsetY(this.image.getHeight() >> 1)

    console.log('~~~~~~~~~~~~~~~~~~')
    console.log(`stage: width:${this.stage.getWidth()}, height: ${this.stage.getHeight()}`)
    console.log(`image: width:${this.image.getWidth()}, height: ${this.image.getHeight()}`)
    console.log(`image: offsetX:${this.image.offsetX()}, offsetY: ${this.image.offsetY()}`)
    console.log(`image: x:${this.image.x()}, y: ${this.image.y()}`)
    console.log(`scale: ${scale}`)

    this.image.getLayer().batchDraw()
  }
}

export default SimpleView
