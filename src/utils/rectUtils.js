
import R from 'ramda'

/**
 * Module for manipulating `Rect` representations
 * @namespace  /utils/rectUtils
 */

export var rectBase = {x: 0, y: 0, width: 0, height: 0}
export var marginBase = {left: 0, right: 0, top: 0, bottom: 0}

/**
 * Inset a `Rect | Size` by a margin
 * @namespace  /utils/rectUtils
 *
 * @param  {Margin} marginInput {left: number, right: number, top: number, bottom: number}
 * @param  {Rect | Size} rectInput
 * @return {Rect}
 */
export function marginInsetRect(marginInput, rectInput) {
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
 * Get the maximum `x` of a `Rect`
 * @namespace  /utils/rectUtils
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
 * @namespace  /utils/rectUtils
 *
 * @param  {Rect} rectInput
 * @return {number}
 */
export function getMaxY(rectInput) {
  var rect = R.merge(rectBase, rectInput)
  return rect.y + rect.height
}
