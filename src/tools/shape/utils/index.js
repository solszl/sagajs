/**
 *
 * Created Date: 2020-03-14, 21:13:03 (zhenliang.sun)
 * Last Modified: 2020-03-31, 18:24:05 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

import Konva from 'konva'
import { Color } from '../theme'
import Point2D from '../../../geometry/point2D'

/** 常量PI */
export const PI = 3.1415926

const SHADOW = {
  shadowColor: Color.SHADOW,
  shadowBlur: 1,
  shadowOffsetX: 1,
  shadowOffsetY: 1,
  shadowOpacity: 0.8,
  cornerRadius: 10
}

/** 创建一个文本组件 */
export function createTextComponent(text = '') {
  return new Konva.Text(
    Object.assign(
      {
        text,
        fontSize: 15,
        align: 'center',
        fill: Color.TEXT_NORMAL
      },
      SHADOW
    )
  )
}

export function createAnchor(radius = 6) {
  const anchor = new Konva.Circle(
    Object.assign(
      {
        fill: 'rgba(0,0,0,0.01)',
        stroke: Color.ANCHOR_NORMAL,
        strokeWidth: 2,
        radius: radius,
        draggable: true
      },
      SHADOW
    )
  )

  return anchor
}

/**
 * 链接指定文本与指定选点之间的连线
 *
 * @export
 * @param {*} textNode 文本
 * @param {*} from 选点数组
 * @param {*} dashLine 虚线， 不可为空
 */
export function connectedObject(textNode, from, dashLine) {
  const text = textNode
  // 求出textNode的 左中、上中、右中、下中 的4个位置
  const a = new Point2D(text.x(), text.y() + text.height() / 2)
  const b = new Point2D(text.x() + text.width() / 2, text.y())
  const c = new Point2D(text.x() + text.width(), text.y() + text.height() / 2)
  const d = new Point2D(text.x() + text.width() / 2, text.y() + text.height())

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

  // 定义虚线的点
  const points = [formPoint.x, formPoint.y, toPoint.x, toPoint.y]
  dashLine.points(points)
  dashLine.draw()
}

/**
 * 根据Konva 的 node 节点生成一个Point2D类型点
 *
 * @export
 * @param {*} node
 * @returns
 */
export function getPoint2D(node) {
  return new Point2D(node.x(), node.y())
}
