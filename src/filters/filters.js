import {halfOfMaxValueOfChannel,
  maxValueOfOneChannel, getMean} 
  from '/src/filters/tools.js'
export {filters}


var filters = {}
filters.grayscale = function() {

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
}


filters.brigthness = function(intensity) {

  function brigthnessInOnePixel(pixel, intensity) {
    return this.applyFunctionToPixelWithoutApplyToAlfaChannel(
      function(channelValue) {
        return channelValue + intensity
      }, pixel)
  }

  function brigthnessInOnePixelWithCordinate(x, y) {
    var newPixel =
      brigthnessInOnePixel.call(this, this.getPixel(x, y), intensity)
    return newPixel
  }

  this.mapAllCanvas(brigthnessInOnePixelWithCordinate)
}


filters.contrast = function(intensity) {
  intensity = (intensity / 100) + 1

  function contrastInOnePixel(pixel, intensity) {
    return this.
    applyFunctionToPixelWithoutApplyToAlfaChannel(
      function(channelValue) {
        return channelValue * intensity
      }, pixel)
  }

  function contrastInOnePixelWithCordinate(x, y) {
    var newPixel =
      contrastInOnePixel.call(this, this.getPixel(x, y), intensity)
    return newPixel
  }

  this.mapAllCanvas(contrastInOnePixelWithCordinate)
}


filters.threshold = function(limitValue = halfOfMaxValueOfChannel ) {

  function thresholdInOnePixel(pixel, limit) {
    var alfaChannelValue = pixel.pop()
    var pixelWithoutAlfaChannel = pixel
    var mean = getMean(pixelWithoutAlfaChannel )
    var newPixel = mean > limit ? 
      [ maxValueOfOneChannel, maxValueOfOneChannel,
        maxValueOfOneChannel, alfaChannelValue] 
      : [0, 0, 0, alfaChannelValue] 
    return newPixel
  }

  function thresholdInOnePixelWithCordinate(x, y) {
    var newPixel =  
      thresholdInOnePixel.call(this, this.getPixel(x, y), limitValue)
    return newPixel
  }
  
  this.mapAllCanvas(thresholdInOnePixelWithCordinate)
}
