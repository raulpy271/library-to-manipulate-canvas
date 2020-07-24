import {ManipulatePixelsInCanvas} 
  from '/src/extended-classes/manPixel.js'
import {filters}
  from '/src/filters/filters.js'

export class ManipulateCanvas
extends ManipulatePixelsInCanvas {

  constructor(canvas){
    super(canvas)
    this.addFilters()
  }

  addFilters() {
    for (var FilterName in filters) {
      this[FilterName] = filters[FilterName]
  }}

  mapAllCanvas (functionToBeApplied) {
    for (var x = 0; x < this.width; x++ ) {
      for (var y = 0; y < this.height; y++) {
        this.setPixel(x, y, 
          (functionToBeApplied.call(this, x, y)) 
        )
  }}}

  mapPixel (functionToBeApplied, pixel) {
    var newPixel = []
    for (var i = 0; i < pixel.length; i++) {
      newPixel.push(functionToBeApplied.call(this, pixel[i]))
    }
    return newPixel
  }

  applyFunctionToPixelWithoutApplyToAlfaChannel
  (functionToBeApplied, pixel) {
    var newPixel = pixel
    var alfaChannelValue = newPixel.pop()
    var pixelWithoutAlfaChannel = newPixel
    newPixel = this.mapPixel(functionToBeApplied, pixelWithoutAlfaChannel)
    newPixel.push(alfaChannelValue)
    return newPixel

  }

  putChanges() {
    this.ctx.putImageData(this.imgData, 0, 0); 
  }

}
