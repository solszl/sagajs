/**
 *
 * Created Date: 2020-02-25, 23:56:38 (zhenliang.sun)
 * Last Modified: 2020-03-14, 06:33:25 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

export const INTERNAL_EVENT_ENUM = {
  /** 首张图片加载完成事件派发 */
  FIRST_SLICE_LOAD_COMPLETED: 'first_slice_load_completed',
  /** 位置发生变化， 派发出新位置 */
  POSITION_CHANGE: 'internal_position_change',
  /** 缩放变化， 派发新的缩放比例 */
  ZOOM_CHANGE: 'internal_zoom_change',
  /** 角度变化，派发需要变化的角度 */
  ROTATE_CHANGE: 'internal_rotate_change',
  /** 反色命令 */
  INVERSE_COLOR: 'internal_inverse_color',
  /** 重置位置、缩放、窗宽窗位 */
  RESET: 'internal_reset'
}
