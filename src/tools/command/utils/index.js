/**
 *
 * Created Date: 2020-03-14, 15:43:52 (zhenliang.sun)
 * Last Modified: 2020-03-14, 20:54:01 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

/**
 * 计算图像内的绝对位置
 * 参考： https://konvajs.org/docs/sandbox/Relative_Pointer_Position.html
 *
 * @export
 * @param {*} node
 * @returns
 */
export function getRelativePointerPosition(node, round = false) {
  // the function will return pointer position relative to the passed node
  var transform = node.getAbsoluteTransform().copy()
  // to detect relative position we need to invert transform
  transform.invert()

  // get pointer (say mouse or touch) position
  var pos = node.getStage().getPointerPosition()

  // now we find relative point
  if (round === false) {
    transform.point(pos)
  }

  const { x, y } = transform.point(pos)
  return { x: ~~x, y: ~~y }
}
