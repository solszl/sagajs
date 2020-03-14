/**
 *
 * Created Date: 2020-03-14, 15:03:22 (zhenliang.sun)
 * Last Modified: 2020-03-14, 15:26:29 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

class Probe {
  constructor(tooltipTpl) {
    this.tooltipTpl = tooltipTpl
  }

  value(ct) {
    const text = this.tooltipTpl.replace(/{ct}/g, ct)
    console.error(text)
  }

  position(pos) {}
}

export default Probe
