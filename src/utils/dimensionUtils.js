
import R from 'ramda'
import d3Scale from 'd3-scale'
import d3Arrays from 'd3-arrays'

import * as rectUtils from './rectUtils'
import * as ticksUtils from './ticksUtils'

/**
 * Module for manipulating `dimension` representations
 * @namespace  /utils/dimensionUtils
 */

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
export const RANGE_LINEAR_COLOR = ['#edf8b1', '#2c7fb8']
const RANGE_ORDINAL_COLOR = ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854', '#ffd92f', '#e5c494', '#b3b3b3']

/**
 * Get the scale type to be used for a dimension on the data.
 * It access the data objects using the prop, and checks if all the variables are of the same type.
 * @memberOf  /utils/dimensionUtils
 *
 * @param  {Array} data
 * @param  {string} prop
 * @return {string}
 */
export function getType(data, prop) {
  // TODO(L): get type most used instead of the one present across all properties.
  const getProp = R.prop(prop)
  let type
  R.any(d => {
    if (type === undefined) {
      type = typeof getProp(d)
      return false
    }
    if (type !== typeof getProp(d)) {
      type = 'mixed'
      return true
    }
  }, data)
  if (type === 'number') return 'linear'
  if (type === 'string') return 'ordinal'
  if (type === 'object') return 'time'
  return 'ordinal'
}

/**
 * Returns scales specific for color mapping.
 * According to type it pre-fills the range of colors
 * @memberOf  /utils/dimensionUtils
 *
 * @example
 * const colorScale = getColorScale('linear', [0, 100])
 * colorScale(100) // '#2c7fb8'
 *
 * @param  {string} type - 'linear' or 'ordinal'
 * @param  {Array} domain - the data domain to be used on the scale
 * @return {function}        d3 scale function
 */
export function getColorScale(type, domain) {
  switch (type) {
  case 'ordinal':
    const scaleOrdinal = d3Scale.ordinal()
      .domain(domain)
      .range(RANGE_ORDINAL_COLOR)
    scaleOrdinal.ticks = () => domain
    return scaleOrdinal
  case 'linear':
  default:
    return d3Scale.linear()
      .domain(domain)
      .range(RANGE_LINEAR_COLOR)
  }
}


export function getDomain(type, data, prop) {
  switch (type) {
  case 'ordinal':
    return R.uniq(R.map(R.prop(prop), data))
  default:
    return d3Arrays.extent(data, R.prop(prop))

  }
}

export function getAxisScale(type, domain, range, tickCount) {
  switch (type) {
  case 'ordinal':
    const scaleOrdinal = d3Scale.ordinal()
      .domain(domain)
      .rangePoints(range)
    if (domain[0] === undefined) {
      scaleOrdinal.ticks = () => ['']
    } else {
      scaleOrdinal.ticks = () => domain
    }
    return scaleOrdinal
  case 'linear':
  default:
    if (domain[0] === domain[1]) {
      const midRange = range[0] + (range[1] - range[0]) / 2
      const scale = () => midRange
      scale.ticks = () => [domain[0] || '']
      return scale
    }
    return d3Scale.linear()
      .domain(domain)
      .range(range)
      .nice(tickCount)

  }
}

/**
 * Get default range according to options
 * @memberOf  /utils/dimensionUtils
 *
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
    return [rectUtils.getMaxY(rect), rect.y]
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
 * Get new scale according to the dimension options
 * @memberOf  /utils/dimensionUtils
 *
 * @param  {Object} dimension
 * @return {function}           new d3 scale
 */
export function getScaleForDimension(dimension, key) {
  var scale = getScaleForType(dimension.type)
    .domain(dimension.domain)
    .range(dimension.range)
  if (key === 'x') {
    scale.nice(ticksUtils.getXCount(dimension.range)) // should contains a count
  }
  if (key === 'y') {
    scale.nice(ticksUtils.getYCount(dimension.range)) // should contains a count
  }
  return scale
}

/**
 * Return a new d3 scale according to the input type
 * @memberOf  /utils/dimensionUtils
 * @example
 * const scale = getScaleForType('linear')
 *
 * scale.domain([0, 100])
 * 	.range([20, 400])
 *
 * @param  {string} type The string needs to be one of the SCALE_TYPES: ['linear', 'log', 'ordinal', 'pow', 'quantile', 'quantize', 'threshold', 'time' ]
 * @return {function}      return a new d3 scale
 */
export function getScaleForType(type) {
  if (R.contains(type, SCALE_TYPES)) return d3Scale[type]()
  throw new Error('scaleUtils.getScaleForType: invalid scale type')
}
