
import utils from '../../utils'
import R from 'ramda'

const defaultMargin = {
  left: 20, right: 20,
  top: 20, bottom: 20,
}

export function calculateMargin(opts) {
  const {size, xType, yType, xDomain, yDomain} = opts
  const plotRect = utils.rect.marginInset(defaultMargin, size)
  const xRange = utils.rect.getRangeX(plotRect)
  const yRange = utils.rect.getRangeY(plotRect)
  const xTickCount = utils.ticks.getXCount(xRange)
  const yTickCount = utils.ticks.getYCount(yRange)

  const xTicks = getTicks(xType, xDomain, xTickCount)
  const yTicks = getTicks(yType, yDomain, yTickCount)
  return {xTicks, yTicks}
}

export function getTicks(type, domain, tickCount) {
  switch (type) {
  case 'ordinal':
    return domain
  default:
    const scale = utils.dim.getAxisScale(type, domain, [0, 0])
    return scale.ticks(tickCount)
  }
}

export function getMaxTextWidth(fontFamily = 'sans', fontSize = 16, ticks) {
  const ctx = getRenderContext()
  ctx.save()
  ctx.font = `${fontSize}px ${fontFamily}`
  const maxSize = R.reduce((reducedSize, d) => {
    const size = ctx.measureText(d).width
    return R.max(size, reducedSize)
  }, 0, ticks)
  ctx.restore()
  return maxSize
}

function noop() { return undefined }

const ctxMock = {
  beginPath: noop,
  bezierCurveTo: noop,
  clearRect: noop,
  clip: noop,
  closePath: noop,
  fillRect: noop,
  fillText: noop,
  isPointInPath: noop,
  isPointInStroke: noop,
  lineTo: noop,
  measureText(text) {
    return {width: text.length}
  },
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
}

let cachedCtx
/**
 * Returns a cached offscreen canvas render.
 * In case the DOM is not available, returns a mocked render context.
 * @return {[type]} [description]
 */
export function getRenderContext() {
  if (cachedCtx) return cachedCtx
  if (global.document && global.document.createElement) {
    cachedCtx = document.createElement('canvas').getContext('2d')
    return cachedCtx
  }
  return ctxMock
}
