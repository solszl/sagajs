import * as dicomParser from 'dicom-parser'

const decodeLittleEndian = async (
  byteArray,
  { bitsAllocated, bitsStored, pixelRepresentation }
) => {
  if (bitsAllocated === 8) {
    return new Uint8Array(
      byteArray.buffer,
      byteArray.byteOffset,
      byteArray.length
    )
  }

  if (bitsAllocated === 16) {
    if (pixelRepresentation === 0) {
      return new Uint16Array(
        byteArray.buffer,
        byteArray.byteOffset,
        byteArray.length / 2
      )
    } else if (bitsStored === 16) {
      return new Int16Array(
        byteArray.buffer,
        byteArray.byteOffset,
        byteArray.length / 2
      )
    } else {
      throw new Error(
        'Signed pixel representation is not fully supported. Please convert the image to unsigned pixel representation.'
      )
    }
  } else if (bitsAllocated === 32) {
    return new Float32Array(
      byteArray.buffer,
      byteArray.byteOffset,
      byteArray.length / 4
    )
  }

  throw new Error(`Unsupported BitsAllocated tag value ${bitsAllocated}.`)
}

const decodeJPEGBaseline = (byteArray, { bitsStored, samplesPerPixel }) =>
  new Promise((resolve, reject) => {
    if (bitsStored === 8) {
      const image = new Image()
      const blob = new Blob([byteArray], { type: 'image/jpeg' })
      const objectUrl = URL.createObjectURL(blob)
      image.src = objectUrl
      image.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = image.naturalWidth
        canvas.height = image.naturalHeight
        const ctx = canvas.getContext('2d')
        ctx.drawImage(image, 0, 0)
        URL.revokeObjectURL(objectUrl)
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        if (samplesPerPixel === 4) {
          resolve(imageData.data)
        } else if (samplesPerPixel === 1) {
          const pixelData = new Uint8Array(imageData.data.length / 4)
          for (let i = 0; i !== pixelData.length; i++) {
            pixelData[i] = imageData.data[i * 4]
          }
          resolve(pixelData)
        } else {
          reject(new Error(`Unspported SamplesPerPixel == ${samplesPerPixel}.`))
        }
      }
      image.onerror = () => {
        reject(new Error('Invalid JPEG baseline image data.'))
      }
    } else {
      reject(
        new Error(
          `Invalid BitsStored == ${bitsStored} for JPEG Baseline Image.`
        )
      )
    }
  })

const parseImageFrame = dataSet => {
  const pixelDataElement = dataSet.elements.x7fe00010

  if (pixelDataElement === undefined) {
    throw new Error('No pixel data to decode.')
  }

  if (pixelDataElement.encapsulatedPixelData) {
    // http://dicom.nema.org/dicom/2013/output/chtml/part05/sect_A.4.html
    if (pixelDataElement.basicOffsetTable.length) {
      return dicomParser.readEncapsulatedImageFrame(
        dataSet,
        pixelDataElement,
        0
      )
    } else if (pixelDataElement.fragments.length === 1) {
      return dicomParser.readEncapsulatedPixelDataFromFragments(
        dataSet,
        dataSet.elements.x7fe00010,
        0
      )
    } else {
      const basicOffsetTable = dicomParser.createJPEGBasicOffsetTable(
        dataSet,
        dataSet.elements.x7fe00010
      )
      return dicomParser.readEncapsulatedImageFrame(
        dataSet,
        dataSet.elements.x7fe00010,
        0,
        basicOffsetTable
      )
    }
  } else {
    return new Uint8Array(
      dataSet.byteArray.buffer,
      pixelDataElement.dataOffset,
      pixelDataElement.length
    )
  }
}

const decodeImageData = async dataSet => {
  const start = Date.now()

  const transferSyntax = dataSet.string('x00020010')
  const bitsAllocated = dataSet.uint16('x00280100')
  const bitsStored = dataSet.uint16('x00280101')
  const highBit = dataSet.uint16('x00280102')
  const pixelRepresentation = dataSet.uint16('x00280103')
  const samplesPerPixel = dataSet.uint16('x00280002')
  const pixelDataByteArray = parseImageFrame(dataSet)

  const makeTexture = pixelData => {
    const end = Date.now()
    const decodeTimeInMs = end - start
    return {
      transferSyntax,
      samplesPerPixel,
      bitsAllocated,
      bitsStored,
      highBit,
      pixelRepresentation,
      pixelData,
      decodeTimeInMs
    }
  }

  const pixelConfig = {
    bitsAllocated,
    bitsStored,
    highBit,
    pixelRepresentation,
    samplesPerPixel
  }

  if (transferSyntax === '1.2.840.10008.1.2') {
    // Implicit VR Little Endian
    return makeTexture(
      await decodeLittleEndian(pixelDataByteArray, pixelConfig)
    )
  } else if (transferSyntax === '1.2.840.10008.1.2.1') {
    // Explicit VR Little Endian
    return makeTexture(
      await decodeLittleEndian(pixelDataByteArray, pixelConfig)
    )
  } else if (transferSyntax === '1.2.840.10008.1.2.1.99') {
    // Deflate transfer syntax (deflated by dicomParser)
    return makeTexture(
      await decodeLittleEndian(pixelDataByteArray, pixelConfig)
    )
  } else if (transferSyntax === '1.2.840.10008.1.2.4.50') {
    // Lossy JPEG 8-bit Image Compression
    return makeTexture(
      await decodeJPEGBaseline(pixelDataByteArray, pixelConfig)
    )
  } else {
    throw new Error(`No decoder for transfer syntax ${transferSyntax}`)
  }
}

export { decodeImageData }
