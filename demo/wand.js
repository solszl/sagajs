const canvas = document.querySelector('#cvs')
const context = canvas.getContext('2d')

// 画肺
const img = document.querySelector('#lung')
context.drawImage(img, 0, 0)

// 获取中间一个大的区域

const bigCanvas = document.createElement('canvas')
document.body.appendChild(bigCanvas)
const bitContext = bigCanvas.getContext('2d')
const bigData = context.getImageData(100, 100, 100, 100)

bitContext.putImageData(bigData, 0, 0)
// console.log(toGray(bigData))
const avgBig = mean(toGray(bigData))

// 获取中间大区域的一部分小区域

const smallCanvas = document.createElement('canvas')
document.body.appendChild(smallCanvas)
const smallContext = smallCanvas.getContext('2d')
const smallData = bitContext.getImageData(37.5, 37.5, 25, 25)
smallContext.putImageData(smallData, 0, 0)

// console.log(toGray(smallData))
// console.log(mean(toGray(smallData)))

const avgSmall = mean(toGray(smallData))

// 变灰度
function toGray(imgData) {
  const data = imgData.data
  const grays = []
  for(let i = 0; i < data.length; i += 4) {
    const gray = (data[i] * 38 + data[i + 1] * 75 + data[i + 2] * 15) >> 7
    data[i] = gray
    data[i + 1] = gray
    data[i + 2] = gray
    data[i + 3] = 0xFF
    grays.push(gray)
  }

  return grays
}

function mean(arr) {
  return arr.reduce((sum, number) => {
    return sum + number
  }, 0) / arr.length
}

console.log(avgBig, avgSmall)

function hammingDistance(x, y) {
  return ((x ^ y).toString(2).match(/1/g) || '').length
}

function calc(bigGrays, small, threshold = 60) {
  console.log(bigData)
  const data = bigData.data
  let index = 0
  for(let i = 0; i < bigGrays.length; i += 1) {
    // if (hammingDistance(bigGrays[i], small) < threshold) {
    if (Math.abs(bigGrays[i] - small) < threshold) {
      data[index] = 0xFF
      data[index + 1] = 0
      data[index + 2] = 0
      data[index + 3] = 0xFF
    }
    index += 4
  }
}

console.log(toGray(bigData).length, bigData.data.length)
calc(toGray(bigData), avgSmall)

bitContext.putImageData(bigData, 0, 0)
