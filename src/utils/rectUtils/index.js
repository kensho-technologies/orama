
import R from 'ramda'

/**
 * Module for manipulating `Rect` representations
 * @namespace  /utils/rectUtils
 */

export var rectBase = {x: 0, y: 0, width: 0, height: 0}
export var marginBase = {left: 0, right: 0, top: 0, bottom: 0}

/**
 * Inset a `Rect | Size` by a margin
 * @memberOf  /utils/rectUtils
 *
 * @param  {Margin} marginInput {left: number, right: number, top: number, bottom: number}
 * @param  {Rect | Size} rectInput
 * @return {Rect}
 */
export function marginInset(marginInput, rectInput) {
  var rect = R.merge(rectBase, rectInput)
  var margin = R.merge(marginBase, marginInput)
  return {
    x: rect.x + margin.left,
    y: rect.y + margin.top,
    width: rect.width - margin.left - margin.right,
    height: rect.height - margin.top - margin.bottom,
  }
}

/**
 * Inset a `Rect` on each side by `value`
 * @memberOf  /utils/rectUtils
 * @example
 * rectUtils.insetRect(10, {x: 0, y: 0, width: 100, height: 100})
 * // {x: 10, y: 10, width: 80, height: 80}
 * @param {number} value
 * @param {Rect} rectInput
 * @return {Rect}
 */
export function inset(value, rectInput) {
  var rect = R.merge(rectBase, rectInput)
  return {
    x: rect.x + value,
    y: rect.y + value,
    width: rect.width - value * 2,
    height: rect.height - value * 2,
  }
}

/**
 * Get the maximum `x` of a `Rect`
 * @memberOf  /utils/rectUtils
 *
 * @param  {Rect} rectInput
 * @return {number}
 */
export function getMaxX(rectInput) {
  var rect = R.merge(rectBase, rectInput)
  return rect.x + rect.width
}

/**
 * Get the maximum `y` of a `Rect`
 * @memberOf  /utils/rectUtils
 *
 * @param  {Rect} rectInput
 * @return {number}
 */
export function getMaxY(rectInput) {
  var rect = R.merge(rectBase, rectInput)
  return rect.y + rect.height
}

/**
 * Get the x `range` of a `Rect`
 * @param  {Rect} rectInput
 * @return {Range}
 */
export function getRangeX(rectInput) {
  var rect = R.merge(rectBase, rectInput)
  return [rect.x, getMaxX(rect)]
}

/**
 * Get the y `range` of a `Rect`
 * @param  {Rect} rectInput
 * @return {Range}
 */
export function getRangeY(rectInput) {
  var rect = R.merge(rectBase, rectInput)
  return [getMaxY(rect), rect.y]
}
