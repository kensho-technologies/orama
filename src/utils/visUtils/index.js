
import R from 'ramda'
import d3Arrays from 'd3-arrays'
import d3Scale from 'd3-scale'

import * as visUtils from '../visUtils'

/**
 * Methods for geting type, domain, range, tickCount, scale and others.
 * Some of the terms used here:
 *
 * - dimension -> `string` representing the visual dimension to be used. Eg: 'x', 'y', 'color', ...
 * - plotRect -> Rect representing the area of the plot {x: number, y: number, width: number, height: number}
 * - prop -> string to be used to access the object property
 * - type -> 'linear', 'ordinal', 'time' or 'log'
 *
 * @namespace /utils/visUtils
 */

const JS_TO_VIS_TYPE = {
  'string': 'ordinal',
  'number': 'linear',
  'date': 'time',
}
export const RANGE_LINEAR_COLOR = ['#edf8b1', '#2c7fb8']
export const RANGE_ORDINAL_COLOR = ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854', '#ffd92f', '#e5c494', '#b3b3b3']
const TICKS_X_SPACE = 100
const TICKS_Y_SPACE = 90
const SCALE_TYPES = [
  'linear',
  'log',
  'ordinal',
  'pow',
  'time',
]

/**
 * Return the type of the input
 * @param  {any} input - array, object, number, date, ...
 * @return {string}
 */
export function toType(input) {
  return ({}).toString.call(input).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

/**
 * Return the most predominantly type on a specific property of an array of objects
 * @memberOf /utils/visUtils
 *
 * @param  {Array.<Object>} data
 * @param  {string} prop
 * @return {string}
 */
export function getType(data, prop) {
  const getProp = R.prop(prop)
  const counter = {string: 0, number: 0, date: 0}
  R.forEach(d => counter[toType(getProp(d))] ++, data)

  const pairs = R.toPairs(counter)
  const max = R.reduce(
    (a, b) => R.maxBy(R.prop(1), a, b),
    [undefined, 0],
    pairs
  )
  return R.prop(max[0], JS_TO_VIS_TYPE)
}

/**
 * Return the domain according to the data, prop and type
 * @memberOf /utils/visUtils
 *
 * @param  {Array.<Object>} data
 * @param  {string} prop
 * @param  {string} type
 * @return {Array}
 */
export function getDomain(data, prop, type) {
  switch (type) {
  case 'ordinal':
    return R.uniq(R.map(R.prop(prop), data))
  default:
    return d3Arrays.extent(data, R.prop(prop))
  }
}

/**
 * Return an range Array according dimension, plotRect and type
 * @memberOf /utils/visUtils
 *
 * @param  {string} dimension
 * @param  {object} plotRect
 * @param  {string} type
 * @return {Array}
 */
export function getRange(dimension, plotRect, type) {
  switch (dimension) {
  case 'x':
    return [plotRect.x, visUtils.getMaxX(plotRect)]
  case 'y':
    return [visUtils.getMaxY(plotRect), plotRect.y]
  case 'color':
    switch (type) {
    case 'ordinal':
      return RANGE_ORDINAL_COLOR
    default:
      return RANGE_LINEAR_COLOR
    }
    break
  default:
    throw new Error(`visUtils.getRange invalid dimension "${dimension}"`)
  }
}

/**
 * Return the number of ticks to be used according to the dimension and range.
 * Does not work with ordinal ranges
 * @memberOf /utils/visUtils
 *
 * @param  {string} dimension
 * @param  {array} range
 * @return {number}
 */
export function getTickCount(dimension, range) {
  switch (dimension) {
  case 'x':
    return Math.round((range[1] - range[0]) / TICKS_X_SPACE)
  case 'y':
    return Math.round((range[0] - range[1]) / TICKS_Y_SPACE)
  default:
    throw new Error(`visUtils.getTickCount invalid dimension "${dimension}"`)
  }
}

/**
 * Returns a d3 scale according to the type
 *
 * @param  {string} type
 * @return {function}       d3Scale
 */
export function getD3Scale(type) {
  if (R.contains(type, SCALE_TYPES)) return d3Scale[type]()
  throw new Error('scaleUtils.getScaleForType: invalid scale type')
}

/**
 * Return a d3 scale configured according to the input parameters
 * @memberOf /utils/visUtils
 *
 * @param  {string} type
 * @param  {Array} domain
 * @param  {Array} range = [0, 1]
 * @param  {number} tickCount
 * @return {function}           d3Scale
 */
export function getScale(type, domain, range = [0, 1], tickCount) {
  switch (type) {
  case 'ordinal':
    const scaleOrdinal = d3Scale.ordinal()
      .domain(domain)
      .rangePoints(range, 1)
    return scaleOrdinal
  case 'linear':
  default:
    if (domain[0] === domain[1]) {
      const midRange = range[0] + (range[1] - range[0]) / 2
      const scaleLinear = () => midRange
      return scaleLinear
    }
    return d3Scale.linear()
      .domain(domain)
      .range(range)
      .nice(tickCount)
  }
}
