
export class Canvas {
  constructor(canvas) {
    this.cv = canvas;
    this.ctx = this.cv.getContext("2d");
  }
}
