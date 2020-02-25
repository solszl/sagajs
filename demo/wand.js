import MouseDelegate from './mouseDelegate'

const canvas = document.querySelector('#cvs')
const context = canvas.getContext('2d')

const delegate = new MouseDelegate(canvas)
// 画肺
const img = document.querySelector('#lung')
context.drawImage(img, 0, 0)
const originData = context.getImageData(0, 0, img.width, img.height)

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
const smallData = bitContext.getImageData(38, 38, 24, 24)
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
    data[i + 3] = 0xff
    grays.push(gray)
  }

  return grays
}

function mean(arr) {
  return (
    arr.reduce((sum, number) => {
      return sum + number
    }, 0) / arr.length
  )
}

console.log(avgBig, avgSmall)

function hammingDistance(x, y) {
  return ((x ^ y).toString(2).match(/1/g) || '').length
}

function calc(bigGrays, small, threshold = 20) {
  console.log(bigData)
  const data = bigData.data
  let index = 0
  for(let i = 0; i < bigGrays.length; i += 1) {
    // if (hammingDistance(bigGrays[i], small) < threshold) {
    // console.log(bigGrays[i], small)
    if (Math.abs(bigGrays[i] - small) < threshold) {
      data[index] = 0xff
      data[index + 1] = 0
      data[index + 2] = 0
      data[index + 3] = 0xff
    }
    index += 4
  }
}

var dom = document.getElementById('container')
var myChart = echarts.init(dom)
var app = {}
var option = null
var xAxisData = []
var data1 = []
var data2 = []
var bigGray = toGray(bigData)
var smallGray = toGray(smallData)
console.log(bigGray)
for(var i = 0; i < 255; i++) {
  xAxisData.push(i)
}

data1 = new Array(255).fill(0)
data2 = new Array(255).fill(0)
for(var i = 0; i < bigGray.length; i++) {
  const index = bigGray[i]
  data1[index] = data1[index] + 1
  const index2 = smallGray[i]
  data2[index2] = data2[index2] + 1
}

option = {
  title: {
    text: '灰度直方图'
  },
  legend: {
    data: ['bar', 'small']
  },
  toolbox: {
    // y: 'bottom',
    feature: {
      magicType: {
        type: ['stack', 'tiled']
      },
      dataView: {},
      saveAsImage: {
        pixelRatio: 2
      }
    }
  },
  tooltip: {},
  xAxis: {
    data: xAxisData,
    splitLine: {
      show: false
    }
  },
  yAxis: {},
  series: [
    {
      name: 'big',
      type: 'bar',
      data: data1
    }, {
      name: 'small',
      type: 'bar',
      data: data2
    }
  ]
}
if (option && typeof option === 'object') {
  myChart.setOption(option, true)
}

// 37.5 为， 小区域直方图中灰度值（max - 距离最远的max2）/2 + min
console.log(avgSmall)
calc(toGray(bigData), 37.5)

bitContext.putImageData(bigData, 0, 0)
