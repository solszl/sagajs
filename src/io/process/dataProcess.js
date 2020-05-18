import * as dicomParser from 'dicom-parser'
import {
  METADATA_TYPE,
  METADATA_UNIT,
  METADATA_UNIT_CONVERTOR
} from './metadata'
import { decodeImageData } from './decode'

/**
 *
 * Created Date: 2020-01-19, 15:05:20 (zhenliang.sun)
 * Last Modified: 2020-04-14, 23:51:01 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

const parse = async buffer => {
  const dataSet = dicomParser.parseDicom(new Uint8Array(buffer))
  window.parser = dicomParser
  window.data = dataSet

  const samplesPerPixel = getData(dataSet, METADATA_TYPE.SAMPLES_PER_PIXEL)
  const photometricInterpretation =
    getData(dataSet, METADATA_TYPE.PHOTOMETRIC_INTERPRETATION) || 'MONOCHROME2'

  const rows = getData(dataSet, METADATA_TYPE.ROWS)
  const columns = getData(dataSet, METADATA_TYPE.COLUMNS)

  const intercept = getData(dataSet, METADATA_TYPE.INTERCEPT) || 0
  const slope = getData(dataSet, METADATA_TYPE.SLOPE) || 1

  const origin = split(getData(dataSet, METADATA_TYPE.ORIGIN))
  const orientation = split(getData(dataSet, METADATA_TYPE.ORIENTATION))
  const pixelSpacing = split(
    getData(dataSet, METADATA_TYPE.SPACING) ||
      getData(dataSet, METADATA_TYPE.SPACING2) ||
      getData(dataSet, METADATA_TYPE.SPACING3)
  )
  const thickness = getData(dataSet, METADATA_TYPE.THICKNESS)

  const slicePosition = getData(dataSet, METADATA_TYPE.SLICE_POSITION)

  const accessionNumber = getData(dataSet, METADATA_TYPE.ACCESSION_NUMBER)
  const patientId = getData(dataSet, METADATA_TYPE.PATIENT_ID)
  const studyDescription = getData(dataSet, METADATA_TYPE.STUDY_DESCRIPTION)
  const seriesDescription = getData(dataSet, METADATA_TYPE.SERIES_DESCRIPTION)
  const studyDate = getData(dataSet, METADATA_TYPE.STUDY_DATE)
  const seriesDate = getData(dataSet, METADATA_TYPE.SERIES_DATE)
  const acquisitionDate = getData(dataSet, METADATA_TYPE.ACQUISITION_DATE)
  const contentDate = getData(dataSet, METADATA_TYPE.CONTENT_DATE)

  const seriesTime = getData(dataSet, METADATA_TYPE.SERIES_TIME)
  const studyTime = getData(dataSet, METADATA_TYPE.STUDY_TIME)
  const acquisitionTime = getData(dataSet, METADATA_TYPE.ACQUISITION_TIME)
  const contentTime = getData(dataSet, METADATA_TYPE.CONTENT_TIME)

  const seriesNumber = getData(dataSet, METADATA_TYPE.SERIES_NUMBER)
  const sliceLocation = getData(dataSet, METADATA_TYPE.SLICE_LOCATION)

  const compression = getData(dataSet, METADATA_TYPE.COMPRESSION)
  const compressRatio = getData(dataSet, METADATA_TYPE.COMPRESS_RATIO)
  const compressMethod = getData(dataSet, METADATA_TYPE.COMPRESS_METHOD)

  const spacingBetweenSlice = getData(
    dataSet,
    METADATA_TYPE.SPACING_BETWEEN_SLICES
  )

  return {
    samplesPerPixel,
    photometricInterpretation,
    rows,
    columns,
    intercept,
    slope,
    origin,
    orientation,
    pixelSpacing,
    thickness,
    slicePosition,
    accessionNumber,
    patientId,
    studyDescription,
    seriesDescription,
    studyDate,
    seriesDate,
    acquisitionDate,
    contentDate,
    studyTime,
    seriesTime,
    acquisitionTime,
    contentTime,
    seriesNumber,
    sliceLocation,
    compression,
    compressRatio,
    compressMethod,
    spacingBetweenSlice,
    ...(await decodeImageData(dataSet))
  }
}

const getData = (dataSet, type) => {
  return dataSet[METADATA_UNIT_CONVERTOR[METADATA_UNIT[type]]](type)
}

const split = data => {
  return data && data.split('\\').map(parseFloat)
}

export { parse }
