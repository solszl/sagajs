/**
 *
 * Created Date: 2020-03-19, 02:00:27 (zhenliang.sun)
 * Last Modified: 2020-03-19, 02:10:08 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

import Konva from 'konva'

/**
 * 形状基类
 *
 * @class BaseShape
 * @extends {Konva.Group}
 * @author zhenliang.sun
 */
class BaseShape extends Konva.Group {
  constructor(cfg = {}) {
    super(cfg)

    this._shapeType = 'base'
  }

  get shapeType() {
    return this._shapeType
  }

  toData() {
    throw new Error('implemented by sub class')
  }

  fromData(data) {
    throw new Error('implemented by sub class')
  }
}

export default BaseShape
