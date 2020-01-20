/**
 *
 * Created Date: 2020-01-19, 15:05:39 (zhenliang.sun)
 * Last Modified: 2020-01-20, 12:24:59 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

export const METADATA_TYPE = {
  /** 图像采样率, VR: US */
  SAMPLES_PER_PIXEL: 'x00280002',
  /** 光度计解释， MONOCHROME1，MONOCHROME2.用来判断图像是否是彩色的，MONOCHROME1/2是灰度图 VR: CS */
  PHOTOMETRIC_INTERPRETATION: 'x00280004',
  /** 图像总行数，VR: US */
  ROWS: 'x00280010',
  /** 图像总列数， VR: US */
  COLUMNS: 'x00280011',
  /** 截距 VR: DS */
  INTERCEPT: 'x00281052',
  /** 斜率 VR: DS */
  SLOPE: 'x00281053',
  /** 图像位置, VR: DS */
  ORIGIN: 'x00200032',
  /** 图像方位， VR: DS */
  ORIENTATION: 'x00200037',
  /** 层厚， VR: DS */
  THICKNESS: 'x00180050',
  /** 层间距 VR:DS */
  SPACING: 'x00280030'
}

export const METADATA_UNIT = {
  x00280002: 'US',
  x00280004: 'CS',
  x00280010: 'US',
  x00280011: 'US',
  x00281052: 'DS',
  x00281053: 'DS',
  x00200032: 'DS',
  x00200037: 'DS',
  x00180050: 'DS',
  x00280030: 'DS'
}

export const METADATA_UNIT_CONVERTOR = {
  US: 'uint16',
  CS: 'string',
  DS: 'floatString'
}
