// Copyright 2018 Kensho Technologies, LLC.

import rectBase from './rectBase'

const MARGIN_BASE = {left: 0, right: 0, top: 0, bottom: 0}

/**
 * Inset a `Rect | Size` by a margin
 * @memberOf  /utils/rectUtils
 *
 * @param  {Margin} marginInput {left: number, right: number, top: number, bottom: number}
 * @param  {Rect | Size} rectInput
 * @return {Rect}
 */
export default function marginInset(marginInput, rectInput) {
  const rect = {...rectBase, ...rectInput}
  const margin = {...MARGIN_BASE, ...marginInput}
  return {
    x: rect.x + margin.left,
    y: rect.y + margin.top,
    width: rect.width - margin.left - margin.right,
    height: rect.height - margin.top - margin.bottom,
  }
}
