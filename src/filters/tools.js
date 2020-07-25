export {maxValueOfOneChannel, halfOfMaxValueOfChannel, getMean}

var maxValueOfOneChannel = 255
var halfOfMaxValueOfChannel = (maxValueOfOneChannel + 1) / 2

function getMean(list) {
  return (list.reduce((sum, val) => (sum += val))) / list.length
}
