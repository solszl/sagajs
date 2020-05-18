/**
 *
 * Created Date: 2020-04-22, 12:44:08 (zhenliang.sun)
 * Last Modified: 2020-04-22, 15:14:51 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

const delta = 21
const angleCosValue = Math.cos((delta / 180) * Math.PI)

const total = 500

function a() {
  for (let i = 0; i < total; i++) {
    const decimal = (angleCosValue * i) % 1
  }
}

console.time('a')
a()
console.timeEnd('a')

function b() {
  for (let i = 0; i < total; i++) {
    const value = angleCosValue * i
    const decimal = value - ~~value
  }
}

console.time('b')
b()
console.timeEnd('b')

function c() {
  for (let i = 0; i < total; i++) {
    const value = angleCosValue * i
    const decimal = value - (value >> 0)
  }
}
console.time('c')
c()
console.timeEnd('c')

function d() {
  for (let i = 0; i < total; i++) {
    const value = angleCosValue * i
    const decimal = value - Math.trunc(value)
  }
}
console.time('d')
d()
console.timeEnd('d')

// 总结 性能 ： c > b > d > a
