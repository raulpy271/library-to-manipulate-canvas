class ManipulateCanvas {

  constructor(canvas){
    this.cv = canvas;
    this.ctx = this.cv.getContext("2d");
    this.imgData = 
    this.ctx.getImageData(0, 0, this.cv.width, this.cv.height);
    this.width = this.imgData.width;
    this.height = this.imgData.height;    
    this.pixels = this.imgData.data;
    this.numberOfChannels = 4
  }

  putChanges() {
    this.ctx.putImageData(this.imgData, 0, 0); 
  }

  getFirstIndexOfPixelInCordinates(x, y) {
    return  ( this.numberOfChannels * ((this.width * y) + x) );
  } 
  
  mean(list) {
    return (list.reduce((sum, val) => (sum += val))) / list.length
  }

  isValidPixel(pixel) {
    if (pixel.length != this.numberOfChannels) {
      return false;
    } else {
      var channelValue;
      for (channelValue of pixel) {
          if (channelValue < 0 || channelValue > 255) {return false;}
      } return true;
  }}

  isValidPosition(x, y) {
    if ( (x >= 0) && (y >= 0) && 
       (x < this.width) &&  (y < this.width) ) {
      return true
    } return false
  }


  getPixel(x, y) {
    var pixel = [];
    var i;
    var index = this.getFirstIndexOfPixelInCordinates(x, y) ;
    if ( ! (this.isValidPosition(x, y)) ) {
      return undefined;
    } else {
      for(i=0; i < this.numberOfChannels; i++) {
        pixel.push(this.imgData.data[index + i]);
      }
      return pixel;
  }}

  setPixel (x, y, newPixel) {
    if (this.isValidPixel(newPixel)) {
      var index = this.getFirstIndexOfPixelInCordinates(x, y);
      var channelNumber;
      for (channelNumber = 0
      ;channelNumber < this.numberOfChannels
      ;channelNumber++) {
        this.imgData.data[index + channelNumber ] = newPixel[channelNumber];
  }}}

  mapAllCanvas (functionToBeApplied) {
    for (var x = 0; x < this.width; x++ ) {
      for (var y = 0; y < this.height; y++) {
        this.setPixel(x, y, 
          (functionToBeApplied.call(this, x, y)) 
        )
  }}}

  pixelToGrayscale(pixel) {
    var alfaChannelValue = pixel.pop()
    var pixelWithoutAlfaChannel = pixel
    var mean = this.mean(pixelWithoutAlfaChannel )
    var newPixel = [] 
    var channelNumber;
    for (channelNumber = 0
    ;channelNumber < (this.numberOfChannels) - 1
    ;channelNumber++) {
      newPixel.push(mean)
    }
    newPixel.push(alfaChannelValue)
    return newPixel
  }

  callPixelToGrayscaleWithCordinate(x, y) {
    var newPixel =  this.pixelToGrayscale(this.getPixel(x, y))
    return newPixel
  }
  
  grayscale() {
    this.mapAllCanvas(this.callPixelToGrayscaleWithCordinate)
    this.putChanges()
  }

}



