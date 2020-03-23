/**
 *
 * Created Date: 2020-03-24, 01:40:33 (zhenliang.sun)
 * Last Modified: 2020-03-24, 02:19:51 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

export function endianness(byteArray, offset) {
  for (let index = 0; index < byteArray.length; index += offset) {
    swap(byteArray, offset, index)
  }
}

function swap(byteArray, offset, index) {
  offset -= 1
  for (let x = 0; x < offset; x += 1) {
    const theByte = byteArray[index + x]
    byteArray[index + x] = byteArray[index + offset]
    byteArray[index + offset] = theByte
    offset -= 1
  }
}

export function swap16(val) {
  return ((val & 0xff) << 8) | ((val >> 8) & 0xff)
}

export function swap32(val) {
  return (
    ((val & 0xff) << 24) |
    ((val & 0xff00) << 8) |
    ((val >> 8) & 0xff00) |
    ((val >> 24) & 0xff)
  )
}
