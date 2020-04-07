/**
 *
 * Created Date: 2020-03-26, 00:55:22 (zhenliang.sun)
 * Last Modified: 2020-03-26, 00:56:41 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

/**
 * 代码来源
 * https://github.com/m-gagne/limit.js
 * 并没有上传npm.再此谢过。
 */

/**
 * debounce
 * @param {integer} milliseconds This param indicates the number of milliseconds
 *     to wait after the last call before calling the original function.
 * @param {object} What "this" refers to in the returned function.
 * @return {function} This returns a function that when called will wait the
 *     indicated number of milliseconds after the last call before
 *     calling the original function.
 */
Function.prototype.debounce = function(milliseconds, context) {
  var baseFunction = this
  var timer = null
  var wait = milliseconds

  return function() {
    var self = context || this
    var args = arguments

    function complete() {
      baseFunction.apply(self, args)
      timer = null
    }

    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(complete, wait)
  }
}

/**
 * throttle
 * @param {integer} milliseconds This param indicates the number of milliseconds
 *     to wait between calls before calling the original function.
 * @param {object} What "this" refers to in the returned function.
 * @return {function} This returns a function that when called will wait the
 *     indicated number of milliseconds between calls before
 *     calling the original function.
 */
Function.prototype.throttle = function(milliseconds, context) {
  var baseFunction = this
  var lastEventTimestamp = null
  var limit = milliseconds

  return function() {
    var self = context || this
    var args = arguments
    var now = Date.now()

    if (!lastEventTimestamp || now - lastEventTimestamp >= limit) {
      lastEventTimestamp = now
      baseFunction.apply(self, args)
    }
  }
}
