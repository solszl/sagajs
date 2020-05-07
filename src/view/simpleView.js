/**
 *
 * Created Date: 2020-04-28, 15:39:46 (zhenliang.sun)
 * Last Modified: 2020-05-07, 20:25:19 (zhenliang.sun)
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
}

export default SimpleView
