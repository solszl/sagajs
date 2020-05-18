/**
 *
 * Created Date: 2020-04-27, 23:35:42 (zhenliang.sun)
 * Last Modified: 2020-04-28, 00:00:05 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

function getIntersectionData(x, y, alpha, width = 512, height = 512) {
  const k = Math.tan((alpha / 180) * Math.PI)
  const b = y / (k * x) // 计算直线与y轴交点。获取直线做方程。 y = k * x + b
  // 分别计算，x = width, x=0, y=height,y=0, 求出各个点
  // y = k * width + b // x=width
  // y = b // x= 0
  // x = (height - b) / k // y = height
  // x = -b / k // y = 0

  const p1 = { x: width, y: k * width + b }
  const p2 = { x: 0, y: b }
  const p3 = { x: (height - b) / k, y: height }
  const p4 = { x: -b / k, y: 0 }

  const result = [p1, p2, p3, p4].filter(p => {
    return p.x >= 0 && p.x <= width && p.y >= 0 && p.y <= height
  })

  console.log(p1, p2, p3, p4)
  console.log(result)
}

getIntersectionData(100, 100, 30)
