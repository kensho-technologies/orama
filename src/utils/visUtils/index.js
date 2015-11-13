
import R from 'ramda'
import d3Arrays from 'd3-arrays'
import d3Scale from 'd3-scale'

import * as rectUtils from '../rectUtils'

/**
 * Methods for geting type, domain, range, tickCount, scale and others.
 * Some of the terms used here:
 *
 * - prop -> string to be used to access the object property
 * - output -> `string` representing the visual output to be used. Eg: 'x', 'y', 'color', ...
 * - type -> type of the data dimension: 'linear', 'ordinal', 'time' or 'log'
 * - domain -> domain of the data according to its type.
 * - range -> output range of a output, according to the type of the data
 * - tickCount -> number of ticks that should be shown on a label of a dimension
 * - scale -> function that map from the domain of the data to the visual range of the output
 * - ticks -> Array of data to be used for labeling the axis of a dimension
 * - plotRect -> Rect representing the area of the plot {x: number, y: number, width: number, height: number}
 *
 * @namespace /utils/visUtils
 */

export const JS_TO_VIS_TYPE = {
  'string': 'ordinal',
  'number': 'linear',
  'date': 'time',
}
export const RANGE_LINEAR_COLOR = ['#edf8b1', '#2c7fb8']
export const RANGE_ORDINAL_COLOR = ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854', '#ffd92f', '#e5c494', '#b3b3b3']
const TICKS_X_SPACE = 100
const TICKS_Y_SPACE = 90

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
 * @param  {string} [type]
 * @return {Array}
 */
export function getDomain(data, prop, type = 'linear') {
  switch (type) {
  case 'ordinal':
    return R.uniq(R.map(R.prop(prop), data))
  default:
    return d3Arrays.extent(data, R.prop(prop))
  }
}

/**
 * Return an range Array according output, plotRect and type
 * @memberOf /utils/visUtils
 *
 * @param  {string} output
 * @param  {object} plotRect
 * @param  {string} [type]
 * @return {Array}
 */
export function getRange(output, plotRect, type) {
  switch (output) {
  case 'y':
    return [rectUtils.getMaxY(plotRect), plotRect.y]
  case 'color':
    switch (type) {
    case 'ordinal':
      return RANGE_ORDINAL_COLOR
    default:
      return RANGE_LINEAR_COLOR
    }
    break
  case 'x':
  default:
    return [plotRect.x, rectUtils.getMaxX(plotRect)]
  }
}

/**
 * Return the number of ticks to be used according to the output and range.
 * Does not work with ordinal ranges
 * @memberOf /utils/visUtils
 *
 * @param  {string} output
 * @param  {array} range
 * @return {number}
 */
export function getTickCount(output, range) {
  switch (output) {
  case 'y':
    return Math.round((range[0] - range[1]) / TICKS_Y_SPACE)
  case 'x':
  default:
    return Math.round((range[1] - range[0]) / TICKS_X_SPACE)
  }
}

/**
 * Return a d3 scale configured according to the input parameters
 * @memberOf /utils/visUtils
 *
 * @param  {string} type
 * @param  {Array} domain
 * @param  {Array} [range=[0, 1]]
 * @param  {number} tickCount
 * @return {function}           d3Scale
 */
export function getScale(output, type, domain, range = [0, 1], tickCount) {
  switch (output) {
  case 'x':
  case 'y':
    return getAxisScale(type, domain, range, tickCount)
  default:
    return getDefaultScale(type, domain, range, tickCount)
  }
}

export function getAxisScale(type, domain, range = [0, 1], tickCount) {
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

export function getDefaultScale(type, domain, range = [0, 1], tickCount) {
  switch (type) {
  case 'ordinal':
    const scaleOrdinal = d3Scale.ordinal()
      .domain(domain)
      .range(range)
    return scaleOrdinal
  case 'linear':
  default:
    return d3Scale.linear()
      .domain(domain)
      .range(range)
      .nice(tickCount)
  }
}

/**
 * Returns the ticks for label and axis drawing
 * @memberOf /utils/visUtils
 *
 * @param  {string} type
 * @param  {string} domain
 * @param  {number} [tickCount]
 * @return {array}           Array of 'number' os 'strings', according to the domain of the data
 */
export function getTicks(type, domain, tickCount) {
  switch (type) {
  case 'ordinal':
    return domain
  case 'linear':
  default:
    return d3Scale.linear().domain(domain).nice(tickCount).ticks(tickCount)
  }
}

/**
 * Returns a function that pluck and scale the prop from a data object
 * @memberOf /utils/visUtils
 *
 * @param  {string} prop
 * @param  {function} scale
 * @return {function}
 */
export function getMap(prop, scale) {
  return R.pipe(R.prop(prop), scale)
}
