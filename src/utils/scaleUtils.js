
import R from 'ramda'
import d3Scale from 'd3-scale'
import * as rectUtils from './rectUtils'

var dimensionBase = {
  name: 'dimensionBase',
  type: 'linear',
  selector: [],
  domain: [0, 1],
  range: [0, 1],
  // rangeType: 'points' | 'roundPoint' | 'bands' | 'roundBands',
}
var SCALE_TYPES = [
  'linear',
  'log',
  'ordinal',
  'pow',
  'quantile',
  'quantize',
  'threshold',
  'time',
]
var RANGE_LINEAR_COLOR = ['#ffffd9', '#081d58']
var RANGE_ORDINAL_COLOR = ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854', '#ffd92f', '#e5c494', '#b3b3b3']

export function getScales(dimensions = {}, rectInput) {
  var rect = R.merge(rectUtils.rectBase, rectInput)
  var scales = {}
  if (dimensions.x) {
    scales.x = scaleForDimension(dimensions.x, [rect.x, rectUtils.getMaxX(rect)])
  }
  if (dimensions.y) {
    scales.y = scaleForDimension(dimensions.y, [rect.y, rectUtils.getMaxY(rect)])
  }
  if (dimensions.color) {
    var rangeColor = dimensions.color.type === 'ordinal'
        ? RANGE_ORDINAL_COLOR
        : RANGE_LINEAR_COLOR
    scales.color = scaleForDimension(dimensions.color, rangeColor)
  }
  return scales
}

export function scaleForDimension(dimensionInput, rangeInput) {
  var rangeObj = rangeInput ? {range: rangeInput} : undefined
  var dimension = R.mergeAll([dimensionBase, rangeObj, dimensionInput])
  var scale = scaleForType(dimension.type)
    .domain(dimension.domain)
    .range(dimension.range)
  return scale
}

export function scaleForType(type) {
  if (R.contains(type, SCALE_TYPES)) return d3Scale[type]()
  throw new Error('invalid scale type')
}
