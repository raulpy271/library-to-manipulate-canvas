import {Canvas} from '/src/extended-classes/canvas.js'


export class ManipulatePixelsInCanvas extends Canvas {

  constructor(canvas) {
    super(canvas)
    this.imgData =
      this.ctx.getImageData(0, 0, this.cv.width, this.cv.height)
    this.width = this.imgData.width;
    this.height = this.imgData.height;    
    this.pixels = this.imgData.data;
    this.numberOfChannels = 4
  }

  getPixel(x, y) {
    var pixel = [];
    var i;
    var index = this.constructor.
      getFirstIndexOfPixelInCordinates.call(this, x, y);
    if ( ! (this.constructor.isPositionInCanvas.call(this, x, y)) ) {
      return undefined;
    } else {
      for(i=0; i < this.numberOfChannels; i++) {
        pixel.push(this.imgData.data[index + i]);
      }
      return pixel;
  }}

  setPixel (x, y, newPixel) {
    if (this.constructor.isValidPixel.call(this, newPixel)) {
      var index = this.constructor.
        getFirstIndexOfPixelInCordinates.call(this, x, y);
      var channelNumber;
      for (channelNumber = 0
      ;channelNumber < this.numberOfChannels
      ;channelNumber++) {
        this.imgData.data[index + channelNumber ] = newPixel[channelNumber];
  }}}


  static getFirstIndexOfPixelInCordinates(x, y) {
    return  ( this.numberOfChannels * ((this.width * y) + x) );
  } 

  static isPositionInCanvas(x, y) {
    if ( (x >= 0) && (y >= 0) && 
       (x < this.width) &&  (y < this.height) ) {
      return true
    } return false
  }

  static isValidPixel(pixel) {
    if (pixel.length != this.numberOfChannels) {
      return false;
    } else {
      var channelValue;
      for (channelValue of pixel) {
          if (channelValue < 0 || channelValue > 255) {return false;}
      } return true;
    }
  }
}
