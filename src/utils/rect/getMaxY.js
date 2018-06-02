// Copyright 2018 Kensho Technologies, LLC.

import rectBase from './rectBase'

/**
 * Get the maximum `y` of a `Rect`
 * @memberOf  /utils/rectUtils
 *
 * @param  {Rect} rectInput
 * @return {number}
 */
export default function getMaxY(rectInput) {
  const rect = {...rectBase, ...rectInput}
  return rect.y + rect.height
}
