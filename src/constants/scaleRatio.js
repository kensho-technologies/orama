// Copyright 2018 Kensho Technologies, LLC.

import isBrowser from './isBrowser'

const devicePixelRatio = isBrowser ? window.devicePixelRatio : 1
const ctx = isBrowser ? document.createElement('canvas').getContext('2d') : {}

const backingStoreRatio =
  ctx.webkitBackingStorePixelRatio ||
  ctx.mozBackingStorePixelRatio ||
  ctx.msBackingStorePixelRatio ||
  ctx.oBackingStorePixelRatio ||
  ctx.backingStorePixelRatio ||
  1

// the ratio by which a canvas should be scaled to match the display DPI
export default devicePixelRatio / backingStoreRatio
