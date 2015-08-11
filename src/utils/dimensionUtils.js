
import R from 'ramda'
import d3Scale from 'd3-scale'
import * as rectUtils from './rectUtils'

export const DIMENSION_BASE = {
  name: 'dimensionBase',
  type: 'linear',
  path: [undefined],
  domain: [0, 1],
  range: [0, 1],
  // rangeType: 'points' | 'roundPoint' | 'bands' | 'roundBands',
}
const SCALE_TYPES = [
  'linear',
  'log',
  'ordinal',
  'pow',
  'quantile',
  'quantize',
  'threshold',
  'time',
]
export const RANGE_LINEAR_COLOR = ['#ffffd9', '#081d58']
const RANGE_ORDINAL_COLOR = ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854', '#ffd92f', '#e5c494', '#b3b3b3']

/**
 * Merge default ranges to the dimensions (curried)
 * @param  {Object} dimensions
 * @param  {Object} rectInput  rect Object
 * @return {Object}            new dimensions object
 */
export const mergeRanges = R.curry((rectInput, dimensions) => {
  const rect = R.merge(rectUtils.rectBase, rectInput)
  const mapDimensions = R.mapObjIndexed((dimension, key) => {
    const range = getRange(key, dimension, rect)
    return R.merge({range}, dimension)
  })
  return mapDimensions(dimensions)
})

/**
 * Merge new scales to the dimensions object
 * @param  {Object} dimensions
 * @return {Object}            new dimensions object
 */
export function mergeScales(dimensions) {
  return R.mapObj(dimension => {
    const scale = getScaleForDimension(dimension)
    return R.merge(dimension, {scale})
  }, dimensions)
}

/**
 * Get new scale according to the dimension options
 * @param  {Object} dimension
 * @return {function}           new d3 scale
 */
export function getScaleForDimension(dimension) {
  var scale = getScaleForType(dimension.type)
    .domain(dimension.domain)
    .range(dimension.range)
  return scale
}

/**
 * Get default range according to options
 * @param  {string} key       dimension name
 * @param  {Object} dimension
 * @param  {Object} rect
 * @return {Array}           range array
 */
export function getRange(key, dimension, rect) {
  switch (key) {
  case 'x':
    return [rect.x, rectUtils.getMaxX(rect)]
  case 'y':
    return [rect.y, rectUtils.getMaxY(rect)]
  case 'color':
    switch (dimension.type) {
    case 'ordinal':
      return RANGE_ORDINAL_COLOR
    default:
      return RANGE_LINEAR_COLOR
    }
    break
  default:
    throw new Error(`scaleUtils.getRange invalid key "${key}"`)
  }
}

/**
 * Return a new d3 scale according to the input type
 * @param  {string} type The string needs to be one of the SCALE_TYPES: ['linear', 'log', 'ordinal', 'pow', 'quantile', 'quantize', 'threshold', 'time' ]
 * @return {function}      return a new d3 scale
 */
export function getScaleForType(type) {
  if (R.contains(type, SCALE_TYPES)) return d3Scale[type]()
  throw new Error('scaleUtils.getScaleForType: invalid scale type')
}
