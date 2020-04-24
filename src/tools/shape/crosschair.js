/**

 *
 * Created Date: 2020-04-24, 14:39:53 (zhenliang.sun)
 * Last Modified: 2020-04-24, 22:12:04 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

import { Group } from 'konva/lib/Group'
import { Circle } from 'konva/lib/shapes/Circle'
import { Line } from 'konva/lib/shapes/Line'
import { getRelativePointerPosition } from '../command/utils/index'

/**
 * MPR的参考线
 *
 * @class CrossChair
 * @extends {Group}
 * @author zhenliang.sun
 */
class CrossChair extends Group {
  constructor(cfg) {
    super(cfg)

    this.on('mouseover', this._onMouseOver.bind(this))
    this.on('mouseout mouseleave', this._onMouseOut.bind(this))

    const colors = this._getColor('')

    this.handle = new Circle({
      fill: 'rgba(255,0,0,1)',
      radius: 7,
      hitStrokeWidth: 16,
      draggable: true,
      name: 'node-anchor',
      x: 256,
      y: 256
    })

    this.handle.on('dragmove', this.onDragHandle.bind(this).throttle(30))

    this.add(this.handle)

    this.line1 = this._createReferenceLine(colors[0], true, this)
    this.line2 = this._createReferenceLine(colors[0], true, this)
    this.line3 = this._createReferenceLine(colors[1], false, this)
    this.line4 = this._createReferenceLine(colors[1], false, this)

    this.anchor1 = this._createAnchor(colors[0], this)
    this.anchor2 = this._createAnchor(colors[0], this)
    this.anchor3 = this._createAnchor(colors[1], this)
    this.anchor4 = this._createAnchor(colors[1], this)

    this.angle = 0
  }

  /** 鼠标划过的时候进行鼠标样式设定 */
  _onMouseOver(e) {
    // pointer all-scroll
    this.getStage().container().style.cursor = 'pointer'
  }

  /** 鼠标离开的时候，将鼠标样式还原 */
  _onMouseOut(e) {
    this.getStage().container().style.cursor = 'auto'
  }

  onDragHandle(e) {
    this.drawReferenceLine()
  }

  onDragReferenceLine(e) {
    const line = e.target
    if (!line) {
      return
    }

    const point = getRelativePointerPosition(this.getStage(), true)
    if (line.vertical) {
      this.handle.y(point.y)
    } else {
      this.handle.x(point.x)
    }

    this.drawReferenceLine()

    this.getStage().batchDraw()
  }

  _getColor(type) {
    // 根据传入的轴位进行匹配颜色， 返回横向、纵向颜色值
    switch (type.toLowerCase()) {
      case 'axis':
        return [CrossChairColor.Coronal, CrossChairColor.Sagittal]
      case 'coronal':
        return [CrossChairColor.Axis, CrossChairColor.Sagittal]
      case 'sagittal':
        return [CrossChairColor.Axis, CrossChairColor.Coronal]
      default:
        return [CrossChairColor.Coronal, CrossChairColor.Sagittal]
    }
  }

  _createAnchor(color, parent) {
    const circle = new Circle({
      fill: color,
      radius: 7,
      hitStrokeWidth: 16,
      draggable: true,
      name: 'node-anchor'
    })

    if (parent) {
      parent.add(circle)
    }

    return circle
  }

  _createReferenceLine(color, vertical, parent) {
    const line = new Line({
      strokeWidth: 2,
      lineCap: 'round',
      lineJoin: 'round',
      hitStrokeWidth: 20,
      stroke: color,
      draggable: true,
      x: 0,
      y: 0,
      dragBoundFunc: pos => {
        return {
          x: vertical ? this.absolutePosition().x : pos.x,
          y: vertical ? pos.y : this.absolutePosition().y
        }
      }
    })

    line.vertical = vertical
    line.on('dragmove', this.onDragReferenceLine.bind(this).throttle(30))

    if (parent) {
      parent.add(line)
    }

    return line
  }

  drawReferenceLine() {
    let { x, y } = this.handle.position()
    x = x >> 0
    y = y >> 0

    this.line1.points([0, y, x - 15, y])
    this.line2.points([x + 15, y, 512, y])
    this.line3.points([x, 0, x, y - 15])
    this.line4.points([x, y + 15, x, 512])

    this.anchor1.position({ x: 4, y })
    this.anchor2.position({ x: 508, y })
    this.anchor3.position({ x, y: 4 })
    this.anchor4.position({ x, y: 508 })
    this.getLayer().batchDraw()
  }
}

export const CrossChairColor = {
  /** 冠状位， 蓝色 */
  Coronal: '#0000FF',
  /** 矢状位， 黄色 */
  Sagittal: '#FFFF00',
  /** 轴状位， 紫色 */
  Axis: '#FF00FF'
}

export default CrossChair
