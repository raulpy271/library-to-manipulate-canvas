class ManipulatePixel {

  constructor(canvas){
    this.cv = canvas;
    this.ctx = this.cv.getContext("2d");
    this.imgData = this.ctx.getImageData(0, 0, this.cv.width, this.cv.height);
    this.width = this.imgData.width;
    this.height = this.imgData.height;    
    this.pixels = this.imgData.data;
  }
  cordinate2index(x, y) {return  ( 4 * ((this.width * y) + x) );} 
  isPixel(pixel) {
    if (pixel.lenght != 4) {return false;}
    for(i of pixel){
        if (i < 0 || i > 255) {return false;}
      } return true;
  }
  getPixel(x, y) {
    var pixel = [];
    var i;
    var index = this.cordinate2index(x, y) ;
    if (x >= this.width || y >= this.height || (x == undefined && !(x === 0)) 
      || (y == undefined && !(y === 0)) || x < 0 || y < 0) {
      return undefined;
    } else {
      for(i=0; i < 4; i++) {
        pixel.push(this.imgData.data[index + i]);
      }
      return pixel;
    }
  }
  setPixel(x, y, newPixel) {
    if ( (this.isPixel(newPixel)) ) {
      return undefined;
    } else {
      var index = this.cordinate2index(x, y);
      for (var i = 0; i < 4; i++) {
        this.imgData.data[index + i ] = newPixel[i];
      } 
      this.ctx.putImageData(this.imgData, 0, 0); 
    }

  }

}
