/**
 *
 * Created Date: 2020-03-19, 02:00:27 (zhenliang.sun)
 * Last Modified: 2020-03-26, 11:12:16 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

import Konva from 'konva'
import { Color } from './theme'

/**
 * 形状基类
 *
 * @class BaseShape
 * @extends {Konva.Group}
 * @author zhenliang.sun
 */
class BaseShape extends Konva.Group {
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
  }

  createAnchor() {
    return new Konva.Circle({
      fill: 'rgba(0,0,0,0.1)',
      stroke: Color.ANCHOR_NORMAL,
      strokeWidth: 2,
      radius: 4,
      hitStrokeWidth: 16,
      draggable: true
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
