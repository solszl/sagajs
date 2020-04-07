import BaseCommand from './baseCommand'
import log from 'loglevel'
/**
 *
 * Created Date: 2020-03-21, 23:20:21 (zhenliang.sun)
 * Last Modified: 2020-04-07, 22:08:10 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

/**
 * 名词解释
 *    冠状位：  coronal
 *    矢状位：  sagittal
 *    轴状位：  axial
 * MPR是根据标准CT影响（dicom数据）， 经过三维重建，重建出对应的冠状位图像与矢状位图像的过程。
 * 重建过程不考虑方位，重建后，由该命令执行方位转换。
 *
 * @class MPRCommand
 * @extends {BaseCommand}
 * @author zhenliang.sun
 */
class MPRCommand extends BaseCommand {
  constructor(config = {}) {
    super()
    this._type = 'MPRCommand'
  }

  execute() {
    super.execute()
  }
}

export default MPRCommand
