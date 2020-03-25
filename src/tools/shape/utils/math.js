/**
 *
 * Created Date: 2020-03-25, 15:47:35 (zhenliang.sun)
 * Last Modified: 2020-03-25, 15:52:15 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */
export function toComma(val) {
  return Number.parseFloat(val || 0).toLocaleString('en-us')
}
