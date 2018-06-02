// Copyright 2018 Kensho Technologies, LLC.

import rectBase from './rectBase'

/**
 * Get the medium `y` of a `Rect`
 * @memberOf  /utils/rectUtils
 *
 * @param  {Rect} rectInput
 * @return {number}
 */
export default function getMidY(rectInput) {
  const rect = {...rectBase, ...rectInput}
  return rect.y + rect.height / 2
}
