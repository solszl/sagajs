/**
 *
 * Created Date: 2020-03-19, 02:00:27 (zhenliang.sun)
 * Last Modified: 2020-04-08, 14:30:20 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

import { Group } from 'konva/lib/Group'
import { Circle } from 'konva/lib/shapes/Circle'
import { Color } from './theme'

/**
 * 形状基类
 *
 * @class BaseShape
 * @extends {Konva.Group}
 * @author zhenliang.sun
 */
class BaseShape extends Group {
  constructor(cfg = {}) {
    super(cfg)

    this._shapeType = 'base'
    this.on('mouseover', this._onMouseOver.bind(this))
    this.on('mouseout mouseleave', this._onMouseOut.bind(this))
  }

  /**
   * protected
   * 鼠标滑过的事件处理
   *
   * @param {*} e
   * @memberof BaseShape
   */
  _onMouseOver(e) {
    // 鼠标滑过的时候 变成小手
    this.getStage().container().style.cursor = 'pointer'
    this.find('.node-anchor').forEach(item => {
      item.stroke(Color.ANCHOR_HOVER)
      item.show()
      const count = item.getParent().getChildren().length - 1
      item.zIndex(count)
    })

    this.find('.node-item').forEach(item => {
      item.stroke(Color.ITEM_HOVER)
    })

    this.find('.node-dashline').forEach(item => {
      item.stroke(Color.ITEM_HOVER)
    })

    this.find('.node-label').forEach(item => {
      item.fill(Color.TEXT_HOVER)
    })

    this.getLayer().batchDraw()
  }

  /**
   * protected
   * 鼠标移出的事件处理
   *
   * @param {*} e
   * @memberof BaseShape
   */
  _onMouseOut(e) {
    // 鼠标离开的时候，恢复成自动
    this.getStage().container().style.cursor = 'auto'
    this.find('.node-anchor').forEach(item => {
      item.stroke(Color.ANCHOR_NORMAL)
      item.hide()
    })

    this.find('.node-item').forEach(item => {
      item.stroke(Color.ITEM_NORMAL)
    })

    this.find('.node-dashline').forEach(item => {
      item.stroke(Color.ITEM_NORMAL)
    })

    this.find('.node-label').forEach(item => {
      item.fill(Color.TEXT_NORMAL)
    })

    this.getLayer().batchDraw()
  }

  createAnchor() {
    return new Circle({
      fill: 'rgba(0,0,0,0.1)',
      stroke: Color.ANCHOR_NORMAL,
      strokeWidth: 2,
      radius: 7,
      hitStrokeWidth: 16,
      draggable: true,
      name: 'node-anchor'
    })
  }

  get shapeType() {
    return this._shapeType
  }

  toData() {
    throw new Error('implemented by sub class')
  }

  fromData(data) {
    throw new Error('implemented by sub class')
  }
}

export default BaseShape
