/**
 *
 * Created Date: 2020-04-16, 20:29:07 (zhenliang.sun)
 * Last Modified: 2020-04-16, 20:37:52 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

export const MPR = () => {
  const originImageBufferMap = sdk.currentView.view.image.pixelBuffer
  const sliceCount = originImageBufferMap.size
  console.error(sliceCount)
}
