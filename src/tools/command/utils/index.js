/**
 *
 * Created Date: 2020-03-14, 15:43:52 (zhenliang.sun)
 * Last Modified: 2020-03-14, 16:37:00 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

/**
 * 计算图像内的绝对位置
 *
 * @export
 * @param {*} node
 * @returns
 */
export function getRelativePointerPosition(node) {
  // the function will return pointer position relative to the passed node
  var transform = node.getAbsoluteTransform().copy()
  // to detect relative position we need to invert transform
  transform.invert()

  // get pointer (say mouse or touch) position
  var pos = node.getStage().getPointerPosition()

  // now we find relative point
  return transform.point(pos)
}
