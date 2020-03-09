import { Layer } from 'konva'

/**
 *
 * Created Date: 2020-03-07, 01:29:42 (zhenliang.sun)
 * Last Modified: 2020-03-09, 16:02:23 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

/**
 * 封装Layer，需要个隐藏的canvas进行数据绘制
 *
 * @class TXLayer
 * @extends {Layer}
 * @author zhenliang.sun
 */
class TXLayer extends Layer {
  constructor(name) {
    super({ name })

    this.canvas = this.getCanvas()
    this.context = this.getContext()

    this.cacheCanvas = document.createElement('canvas')

    // 偏移
    this.translate = { x: 0, y: 0 }
    // 缩放
    this.scale = { x: 1, y: 1 }
    // 原点
    this.origin = { x: 0, y: 0 }

    this.originImageSize = { width: 0, height: 0 }

    this.imageData = null
  }

  originSize(width, height) {
    this.cacheCanvas.width = width
    this.cacheCanvas.height = height
    this.originImageSize = { width, height }
  }

  size(width, height) {
    super.setSize({ width, height })
  }

  move(x, y) {
    this.translate = { x, y }
  }

  zoom(scaleX, scaleY, centerX = 0, centerY = 0) {
    const x = centerX - (centerX - this.origin.x) * (scaleX / this.scale.x)
    const y = centerY - (centerY - this.origin.y) * (scaleY / this.scale.y)
    this.origin = { x, y }
    this.scale = { x: scaleX, y: scaleY }
  }

  setImageData(data) {
    this.imageData = data
    this.cacheCanvas.getContext('2d').putImageData(data, 0, 0)

    this.draw()
  }

  draw() {
    this.context.save()
    // indent transform matrix
    this.context.setTransform(1, 0, 0, 1, 0, 0)
    const { width, height } = this.canvas
    this.context.clearRect(0, 0, width, height)
    this.context.restore()

    this.context.setTransform(
      this.scale.x,
      0,
      0,
      this.scale.y,
      this.origin.x + this.translate.x,
      this.origin.y + this.translate.y
    )

    this.context.drawImage(this.cacheCanvas, 0, 0)
  }
}

export default TXLayer
