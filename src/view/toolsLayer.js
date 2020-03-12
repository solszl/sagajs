import Konva, { Layer } from 'konva'

/**
 *
 * Created Date: 2020-03-08, 23:11:55 (zhenliang.sun)
 * Last Modified: 2020-03-12, 16:17:01 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

/**
 * 工具层
 *
 * @class ToolsLayer
 * @extends {Layer}
 * @author zhenliang.sun
 */
class ToolsLayer extends Layer {
  constructor(name) {
    super({
      name
    })

    // konvajs 支持这些事件
    // mouse: mouseover, mousemove, mouseout, mouseenter, mouseleave, mousedown, mouseup, wheel,
    // click: contextmenu, click, dblclick,
    // touch: touchstart, touchmove, touchend, tap, dbltap,
    // drag: dragstart, dragmove, dragend

    this.on('click', function() {
      console.log('tools')
    })

    const circle = new Konva.Circle({
      x: 200,
      y: 100,
      radius: 30,
      fill: 'red'
    })

    this.add(circle)

    var text = new Konva.Text({
      text: '123123',
      fontFamily: 'Calibri',
      fontSize: 24,
      fill: 'black',
      x: 10,
      y: 10
    })

    this.add(text)
    // TODO: Hotkey
  }
}

export default ToolsLayer
