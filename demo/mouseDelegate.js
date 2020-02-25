export default class MouseDelegate {
  constructor(canvas) {
    this.canvas = canvas
    this.canvas.addEventListener('mouseup', this._mouseUp.bind(this))
    this.canvas.addEventListener('mousedown', this._mouseDown.bind(this))
    this.canvas.addEventListener('mousemove', this._mouseMove.bind(this))

    this.dragging = false

    this.rect = {}
  }

  _mouseUp(e) {
    this.dragging = false
  }

  _mouseMove(e) {
    if (!this.dragging) {
      return
    }

    const pos = this._getMousePos(e)
    this.rect.width = pos.x - this.rect.startX
    this.rect.height = pos.y - this.rect.startY

    console.log(this.rect)
  }

  _mouseDown(e) {
    this.dragging = true
    const pos = this._getMousePos(e)
    this.rect.startX = pos.x
    this.rect.startY = pos.y
  }

  _getMousePos(e) {
    const rect = this.canvas.getBoundingClientRect()
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }
  }
}
