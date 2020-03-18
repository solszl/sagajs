/**
 *
 * Created Date: 2020-03-16, 16:51:48 (zhenliang.sun)
 * Last Modified: 2020-03-19, 03:29:11 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

import Konva from 'konva'
import log from 'loglevel'
import { getRelativePointerPosition } from './../command/utils'
import { Color } from './theme'
import { createTextComponent, connectedObject } from './utils'
import Point2D from '../../geometry/Point2D'

/**
 * 长度测量工具
 * 2个圆，1个线，一个文案，一个虚线连接
 *
 * @class Length
 * @extends {Konva.Group}
 */
class Length extends Konva.Group {
  constructor(spacing, cfg = {}) {
    super(cfg)

    this.ee = {
      mousemove: this._mouseMove.bind(this),
      mouseup: this._mouseUp.bind(this)
    }

    this.spacing = spacing

    this.anchor1 = null
    this.anchor2 = null

    this.line = null

    this.text = null

    this.dashLine = null
    // 如果抓取过文本，那么再拖动锚点的时候，文本就不再跟随锚点动了
    this.textDragged = false
  }

  start() {
    // 给stage绑定事件
    for (const event in this.ee) {
      this.getStage().on(event, this.ee[event])
    }

    const mouse = getRelativePointerPosition(this.getStage())
    this.anchor1 = new Konva.Circle({
      fill: 'rgba(0,0,0,0.1)',
      stroke: Color.ANCHOR_NORMAL,
      strokeWidth: 2,
      radius: 4,
      hitStrokeWidth: 16,
      draggable: true
    })

    this.add(this.anchor1)
    this.position(mouse)
    this.anchor1.position({ x: 0, y: 0 })

    this.anchor2 = new Konva.Circle({
      fill: 'rgba(0,0,0,0.1)',
      stroke: Color.ANCHOR_NORMAL,
      strokeWidth: 2,
      radius: 4,
      hitStrokeWidth: 16,
      draggable: true
    })
    this.add(this.anchor2)
    this.anchor2.position({ x: 0, y: 0 })

    this.line = new Konva.Line({
      stroke: Color.ITEM_NORMAL,
      hitStrokeWidth: 20
    })
    this.line.moveToBottom()
    this.add(this.line)

    this.text = createTextComponent()
    this.text.draggable(true)
    this.add(this.text)

    this.draggable(true)

    this.draw()
    ;[this.anchor1, this.anchor2].forEach(anchor => {
      anchor.on('dragmove', this._dragAnchorMove.bind(this))
    })

    this.text.on('dragstart', this._dragTextStart.bind(this))
    this.text.on('dragmove', this._dragText.bind(this))

    this.on('dragmove', this._dragMove.bind(this))

    this.on('mouseover', () => {
      this.getStage().container().style.cursor = 'pointer'
    })
    this.on('mouseout', () => {
      this.getStage().container().style.cursor = 'auto'
    })
  }

  _mouseMove(e) {
    const mouse = getRelativePointerPosition(this.getStage())
    const position = { x: mouse.x - this.x(), y: mouse.y - this.y() }
    this.anchor2.position(position)

    this._dragAnchorMove()
  }

  _mouseUp(e) {
    for (const event in this.ee) {
      this.getStage().removeEventListener(event, this.ee[event])
    }

    const mouse = getRelativePointerPosition(this.getStage())
    const position = { x: mouse.x - this.x(), y: mouse.y - this.y() }
    this.anchor2.position(position)
    this.getLayer().batchDraw()
  }

  _dragAnchorMove() {
    const x1 = this.anchor1.x()
    const y1 = this.anchor1.y()
    const x2 = this.anchor2.x()
    const y2 = this.anchor2.y()
    const points = [x1, y1, x2, y2]
    this.line.points(points)

    const distance = Math.sqrt((x2 - x1) ** 2, (y2 - y1) ** 2)
    const len = (distance * this.spacing.rowSpacing).toFixed(2) + 'mm'

    // 如果没拖动过文本，那么就让他靠右边显示
    // 如果拖过的话，那么就固定在那个位置。
    if (!this.textDragged) {
      const useAnchor = x2 - x1 > 0 ? this.anchor2 : this.anchor1
      this.text.position({ x: useAnchor.x() + 10, y: useAnchor.y() })
    } else {
      this._connectObject(this.text, this.anchor1, this.anchor2)
    }

    this.text.text(len)

    this.getLayer().batchDraw()
  }

  _dragText() {
    this._connectObject(this.text, this.anchor1, this.anchor2)
    this.getStage().batchDraw()
  }

  _dragTextStart() {
    this.textDragged = true
  }

  _dragMove() {
    // const mouse = getRelativePointerPosition(this.getStage())
    // console.log(mouse)
  }

  _connectObject(text, anchor1, anchor2) {
    // 分别求A,B,AB/2 点与text的距离
    // 求出text的 左中、上中、右中、下中 的4个位置
    const a = new Point2D(text.x(), text.y() + text.height() / 2)
    const b = new Point2D(text.x() + text.width() / 2, text.y())
    const c = new Point2D(text.x() + text.width(), text.y() + text.height() / 2)
    const d = new Point2D(text.x() + text.width() / 2, text.y() + text.height())

    // 求出2个锚点以及中间点的位置
    const originA = new Point2D(anchor1.x(), anchor1.y())
    const originB = new Point2D(anchor2.x(), anchor2.y())
    const originAB2 = new Point2D(
      (anchor1.x() + anchor2.x()) / 2,
      (anchor1.y() + anchor2.y()) / 2
    )

    const from = [originA, originB, originAB2]
    const to = [a, b, c, d]
    let min = Number.MAX_SAFE_INTEGER
    let formPoint = null
    let toPoint = null

    // 锚点也text的四边进行距离比对，求出最短路径对应的点
    for (let i = 0; i < from.length; i += 1) {
      for (let j = 0; j < to.length; j += 1) {
        const distance = from[i].distance(to[j])
        if (distance < min) {
          formPoint = from[i]
          toPoint = to[j]
          min = distance
        }
      }
    }

    // 判断是否存在虚线
    this.dashLine = this.dashLine || this.findOne('.dashLine')
    if (!this.dashLine) {
      this.dashLine = new Konva.Line({
        stroke: Color.ITEM_NORMAL,
        strokeWidth: 2,
        lineJoin: 'round',
        dash: [6, 3],
        name: 'dashLine'
      })

      this.add(this.dashLine)
      this.dashLine.moveToBottom()
    }

    // 定义虚线的点
    const points = [formPoint.x, formPoint.y, toPoint.x, toPoint.y]
    this.dashLine.points(points)
    this.dashLine.draw()
  }
}

export default Length
