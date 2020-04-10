/**
 *
 * Created Date: 2020-01-19, 15:05:39 (zhenliang.sun)
 * Last Modified: 2020-04-09, 16:39:13 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

/**
 * 参考1： https://www.leadtools.com/help/leadtools/v19/dicom/api/dataelementtagtable.html
 * 参考2： https://blog.csdn.net/wenzhi20102321/article/details/75127101/
 * 参考3： https://blog.csdn.net/wenzhi20102321/article/details/75127140
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
  SPACING: 'x00280030',
  SPACING2: 'x00181164',
  SPACING3: 'x00182010',
  /** 层数 instanceNumber， VR:IS  */
  SLICE_POSITION: 'x00200013',

  /** 检查号：RIS的生成序号,用以标识做检查的次序. VR:SH */
  ACCESSION_NUMBER: 'x00080050',
  /** 患者ID, VR: LO */
  PATIENT_ID: 'x00100020',
  /** 检查的描述. VR:LO */
  STUDY_DESCRIPTION: 'x00081030',
  /** 检查描述和说明. VR: LO */
  SERIES_DESCRIPTION: 'x0008103e',
  /** 检查日期. VR: DA */
  SERIES_DATE: 'x00080021',
  STUDY_DATE: 'x00080020',
  ACQUISITION_DATE: 'x00080022',
  CONTENT_DATE: 'x00080023',
  /** 检查时间. VR: DA */
  SERIES_TIME: 'x00080031',
  STUDY_TIME: 'x00080030',
  ACQUISITION_TIME: 'x00080032',
  CONTENT_TIME: 'x00080033',
  /** 序列号：识别不同检查的号. VR:IS */
  SERIES_NUMBER: 'x00200011',
  /** 实际的相对位置，单位为mm. VR:DS */
  SLICE_LOCATION: 'x00201041',
  /** 是否是有损压缩 VR: CS */
  COMPRESSION: 'x00282110',
  /** 压缩比例，VR:DS */
  COMPRESS_RATIO: 'x00282112',
  /** 压缩方式 VR: CS */
  COMPRESS_METHOD: 'x00282114',
  /** 实际的相对位置，单位为mm. 通常情况下，如果该值不存在， 就用两个相邻的dicom文件，读取sliceLocation做差 VR:DS */
  SPACING_BETWEEN_SLICES: 'x00180088'
}

export const METADATA_UNIT = {
  x00280002: 'US',
  x00280004: 'CS',
  x00280010: 'US',
  x00280011: 'US',
  x00281052: 'DS',
  x00281053: 'DS',
  x00200032: 'CUSTOM_DS',
  x00200037: 'CUSTOM_DS',
  x00180050: 'DS',
  x00280030: 'CUSTOM_DS',
  x00181164: 'CUSTOM_DS',
  x00182010: 'CUSTOM_DS',
  x00200013: 'IS',
  x00080050: 'SH',
  x00100020: 'LO',
  x00081030: 'LO',
  x0008103e: 'LO',
  x00080020: 'DA',
  x00080021: 'DA',
  x00080022: 'DA',
  x00080023: 'DA',
  x00080030: 'DA',
  x00080031: 'DA',
  x00080032: 'DA',
  x00080033: 'DA',
  x00200011: 'IS',
  x00201041: 'DS',
  x00282110: 'CS',
  x00282112: 'DS',
  x00282114: 'CS',
  x00180088: 'DS'
}

export const METADATA_UNIT_CONVERTOR = {
  US: 'uint16',
  CS: 'string',
  DS: 'floatString',
  CUSTOM_DS: 'string',
  IS: 'floatString',
  SH: 'string',
  LO: 'string',
  DA: 'string'
}
