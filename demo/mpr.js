/**
 *
 * Created Date: 2020-04-16, 20:29:07 (zhenliang.sun)
 * Last Modified: 2020-04-23, 21:42:39 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

import { Konva } from 'konva/lib/Global'

let stage
let layer
let imageData
let image_rt
export const MPR = async angle => {
  const image = sdk.currentView.view.image
  const originImageBufferMap = image.pixelBuffer
  const sliceCount = originImageBufferMap.size

  const orientation = image.geometry.orientation

  const { rowVector, columnVector } = orientation

  const zVector = rowVector.crossProduct(columnVector)

  const { columnSpacing, rowSpacing, sliceSpacing } = image.geometry.spacing
  const { column, row, slice } = image.geometry.size

  const newImageData = []

  const delta = angle // 旋转角度
  const angleCosValue = Math.cos((delta / 180) * Math.PI)
  const angleTanValue = Math.tan((delta / 180) * Math.PI)
  const angleSinValue = Math.sin(((90 - delta) / 180) * Math.PI)

  const factor = (sliceSpacing * angleCosValue) / rowSpacing

  let newRow =
    delta > 45 ? (column * angleSinValue) >> 0 : (slice / angleCosValue) >> 0
  const newColumn = column

  newRow = (newRow * factor) >> 0
  console.error(`angle:${delta}, column:${newColumn}, row:${newRow}`)
  for (let j = 0; j < newRow; j += 1) {
    for (let i = 0; i < newColumn; i += 1) {
      let sliceIndex = -1

      const value = (angleCosValue * j) / factor
      sliceIndex = value >> 0

      const decimal = value - (value >> 0)
      if (decimal > 0.5) {
        sliceIndex += 1
      }

      const data = originImageBufferMap.get(sliceIndex + 1)[
        i * row + ((256 - (sliceIndex + 1) * angleTanValue) >> 0)
      ]

      newImageData[i * newRow + j] = data
    }
  }

  if (!stage) {
    stage = new Konva.Stage({
      container: 'container3',
      width: 512,
      height: 512
    })
  }

  if (!layer) {
    layer = new Konva.Layer()
    stage.add(layer)
  }

  if (!image_rt) {
    image_rt = new Konva.Image({ id: 'image_rt' })
    layer.add(image_rt)
  }

  const imageDataRT = new ImageData(newRow, newColumn)
  generateImageData(imageDataRT, newImageData)
  image_rt.image(await createImageBitmap(imageDataRT))
  stage.batchDraw()
}

const generateImageData = (buffer, originData) => {
  const lut = sdk.currentView.view.windowLut
  const colourMap = sdk.currentView.view.colourMap.colour

  let pixelIndex = 0
  let bufferIndex = 0
  while (pixelIndex < originData.length) {
    const pixelData = lut.getValue(originData[pixelIndex])
    buffer.data[bufferIndex] = colourMap.red[pixelData] // red
    buffer.data[bufferIndex + 1] = colourMap.green[pixelData] // green
    buffer.data[bufferIndex + 2] = colourMap.blue[pixelData] // blue
    buffer.data[bufferIndex + 3] = 0xff // alpha
    pixelIndex += 1
    bufferIndex += 4
  }
}
