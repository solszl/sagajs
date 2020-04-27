/**
 *
 * Created Date: 2020-04-27, 15:53:26 (zhenliang.sun)
 * Last Modified: 2020-04-27, 17:30:26 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

import IEvent from '../../src/component/event'

class MPR3D extends IEvent {
  constructor(cfg) {
    super()
    this.config = cfg
  }

  make(x, y, z, a, b, c) {
    // x,冠状位， y,矢状位，z,轴状位
    // a, 轴状位不变，影响冠状位和矢状位旋转角度成像
    // b, 矢状位不变，影响轴状位和冠状位旋转角度成像
    // c, 冠状位不变，影响轴状位和矢状位旋转角度成像

    this.makeAxisImage()
    this.makeSagittalImage()
    this.makeCoronalImage()

    console.error(x, y, z, a, b, c)
  }

  makeAxisImage() {}
  makeSagittalImage() {}
  makeCoronalImage() {}
}

export default MPR3D
