// Copyright 2018 Kensho Technologies, LLC.

import rectBase from './rectBase'

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
export default function inset(value, rectInput) {
  const rect = {...rectBase, ...rectInput}
  return {
    x: rect.x + value,
    y: rect.y + value,
    width: rect.width - value * 2,
    height: rect.height - value * 2,
  }
}
