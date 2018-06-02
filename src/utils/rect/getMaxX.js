// Copyright 2018 Kensho Technologies, LLC.

import rectBase from './rectBase'

/**
 * Get the maximum `x` of a `Rect`
 * @memberOf  /utils/rectUtils
 *
 * @param  {Rect} rectInput
 * @return {number}
 */
export default function getMaxX(rectInput) {
  const rect = {...rectBase, ...rectInput}
  return rect.x + rect.width
}
