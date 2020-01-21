import * as dicomParser from 'dicom-parser'
import {
  METADATA_TYPE,
  METADATA_UNIT,
  METADATA_UNIT_CONVERTOR
} from './metadata'

/**
 *
 * Created Date: 2020-01-19, 15:05:20 (zhenliang.sun)
 * Last Modified: 2020-01-21, 12:27:36 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

const parse = buffer => {
  const dataSet = dicomParser.parseDicom(new Uint8Array(buffer))

  const samplesPerPixel = getData(dataSet, METADATA_TYPE.SAMPLES_PER_PIXEL)
  const photometricInterpretation =
    getData(dataSet, METADATA_TYPE.PHOTOMETRIC_INTERPRETATION) || 'MONOCHROME2'

  const rows = getData(dataSet, METADATA_TYPE.ROWS)
  const columns = getData(dataSet, METADATA_TYPE.COLUMNS)

  const intercept = getData(dataSet, METADATA_TYPE.INTERCEPT) || 0
  const slope = getData(dataSet, METADATA_TYPE.SLOPE) || 1

  const origin = split(getData(dataSet, METADATA_TYPE.ORIGIN))
  const orientation = split(getData(dataSet, METADATA_TYPE.ORIENTATION))
  const pixelSpacing = split(getData(dataSet, METADATA_TYPE.SPACING))
  const thickness = getData(dataSet, METADATA_TYPE.THICKNESS)

  return {
    dataSet,
    samplesPerPixel,
    photometricInterpretation,
    rows,
    columns,
    intercept,
    slope,
    origin,
    orientation,
    pixelSpacing,
    thickness
  }
}

const getData = (dataSet, type) => {
  return dataSet[METADATA_UNIT_CONVERTOR[METADATA_UNIT[type]]](type)
}

const split = data => {
  return data && data.split('\\').map(parseFloat)
}

export { parse }
