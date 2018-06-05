const devicePixelRatio = typeof window === 'object' ? window.devicePixelRatio : 1
const ctx = typeof document === 'object' ? document.createElement('canvas').getContext('2d') : {}
const backingStoreRatio =
  ctx.webkitBackingStorePixelRatio ||
  ctx.mozBackingStorePixelRatio ||
  ctx.msBackingStorePixelRatio ||
  ctx.oBackingStorePixelRatio ||
  ctx.backingStorePixelRatio ||
  1

export default devicePixelRatio / backingStoreRatio
