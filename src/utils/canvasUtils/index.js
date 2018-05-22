// Copyright 2018 Kensho Technologies, LLC.

import {rectBase} from '../rectUtils'

const noop = () => undefined
export const ctxMock = {
  beginPath: noop,
  bezierCurveTo: noop,
  clearRect: noop,
  clip: noop,
  closePath: noop,
  fill: noop,
  fillRect: noop,
  fillText: noop,
  isPointInPath: noop,
  isPointInStroke: noop,
  lineTo: noop,
  measureText: text => ({width: text.toString().length}),
  arcTo: noop,
  moveTo: noop,
  quadraticCurveTo: noop,
  rect: noop,
  restore: noop,
  rotate: noop,
  save: noop,
  scale: noop,
  strokeRect: noop,
  strokeText: noop,
  transform: noop,
  translate: noop,
  stroke: noop,
  setLineDash: noop,
}
export const canvasMock = {
  getContext: () => ctxMock,
  getBoundingClientRect: () => ({left: 0, top: 0, width: 500, height: 500}),
}
let cachedCtx
/*
Returns a cached offscreen canvas render.
In case the DOM is not available, returns a mocked render context.

The context returned by this function is shared, always call `save()` and `restore()` when manipulating it
*/
export function getCachedContext() {
  if (cachedCtx) return cachedCtx
  if (global.document && global.document.createElement) {
    cachedCtx = document.createElement('canvas').getContext('2d')
    return cachedCtx
  }
  return ctxMock
}

export function clearRect(ctx, rectInput) {
  const rect = {...rectBase, ...rectInput}
  ctx.clearRect(rect.x, rect.y, rect.width, rect.height)
}
export function fillRect(ctx, rectInput) {
  const rect = {...rectBase, ...rectInput}
  ctx.fillRect(rect.x, rect.y, rect.width, rect.height)
}
export function strokeRect(ctx, rectInput) {
  const rect = {...rectBase, ...rectInput}
  ctx.strokeRect(rect.x, rect.y, rect.width, rect.height)
}
