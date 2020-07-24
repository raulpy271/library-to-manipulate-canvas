
export var filters = {

  grayscale: function() {

    function getMean(list) {
      return (list.reduce((sum, val) => (sum += val))) / list.length
    }

    function pixelToGrayscale(pixel) {
      var alfaChannelValue = pixel.pop()
      var pixelWithoutAlfaChannel = pixel
      var mean = getMean(pixelWithoutAlfaChannel )
      var newPixel = this.mapPixel(
        function(trash) {return mean}, pixelWithoutAlfaChannel
      )
      newPixel.push(alfaChannelValue)
      return newPixel
    }

    function callPixelToGrayscaleWithCordinate(x, y) {
      var newPixel =  pixelToGrayscale.call(this, this.getPixel(x, y))
      return newPixel
    }

    this.mapAllCanvas(callPixelToGrayscaleWithCordinate)
  },

  brigthness: function(intensity) {

    function brigthnessInOnePixel(pixel, intensity) {
      return this.applyFunctionToPixelWithoutApplyToAlfaChannel(
        function(channelValue) {
          return channelValue + intensity
        }, pixel)
    }

    function brigthnessInOnePixelWithCordinate(x, y) {
      var newPixel =  brigthnessInOnePixel.call(this, this.getPixel(x, y), intensity)
      return newPixel
    }

    this.mapAllCanvas(brigthnessInOnePixelWithCordinate)
  }
}
