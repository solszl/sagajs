/**
 *
 * Created Date: 2020-03-14, 21:13:03 (zhenliang.sun)
 * Last Modified: 2020-03-19, 02:26:09 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

import Konva from 'konva'
import { Color } from '../theme'

/** 常量PI */
export const PI = 3.1415926

const SHADOW = {
  shadowColor: Color.SHADOW,
  shadowBlur: 2,
  shadowOffsetX: 1,
  shadowOffsetY: 1,
  shadowOpacity: 0.5,
  cornerRadius: 10
}

/** 创建一个文本组件 */
export function createTextComponent(text = '') {
  return new Konva.Text(
    Object.assign(
      {
        text,
        fontSize: 12,
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
 * 连接2个容器， 根据2个容器的位置自动补全2个容器之间的连线。
 * fixedNode 的上下左右，node 的上下左右
 *
 * @export
 * @param {*} fixedNode 通常来讲是固定的组件容器
 * @param {*} node 文案容器
 */
export function connectedObject(fixedNode, node, line) {
  const group = fixedNode.getParent()

  console.log('group', group.x(), group.y(), group.width(), group.height())
  console.log(
    'fixedNode',
    fixedNode.x(),
    fixedNode.y(),
    fixedNode.width(),
    fixedNode.height()
  )
  // console.log('node:', node.x(), node.y(), node.width(), node.height())

  line = line || group.findOne('.dashLine')
  if (!line) {
    line = new Konva.Line({
      stroke: Color.ITEM_NORMAL,
      strokeWidth: 2,
      lineJoin: 'round',
      dash: [6, 3],
      name: 'dashLine'
    })

    group.add(line)
    line.moveToBottom()
  }

  const points = [fixedNode.x(), fixedNode.y(), node.x(), node.y()]
  line.points(points)
  line.draw()
  // const dashLine = new
}
