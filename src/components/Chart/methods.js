
import utils from '../../utils'
import R from 'ramda'

import defaultTheme from '../defaultTheme'

const defaultMargin = {
  left: 20, right: 20,
  top: 20, bottom: 60,
}

export function calculateMargin(opts) {
  const {size, yType, yDomain} = opts
  const styleVars = opts.styleVars || defaultTheme
  const plotRect = utils.rect.marginInset(defaultMargin, size)
  const yRange = utils.rect.getRangeY(plotRect)
  const yTickCount = utils.vis.getTickCount('y', yRange)

  const yTicks = utils.vis.getTicks(yType, yDomain, yTickCount)
  const maxYTickWidth = getMaxTextWidth(styleVars.fontMono, styleVars.axis.tickFontSize, yTicks)
  const left = (
    5 + styleVars.axis.labelFontSize * 1.7
    + maxYTickWidth + 6
    + styleVars.axis.chartPadding
  )
  const bottom = (
    5 + styleVars.axis.labelFontSize * 1.5
    + styleVars.axis.tickFontSize + 6
    + styleVars.axis.chartPadding
  )
  const newMargin = utils.rect.marginInset(
    {
      top: styleVars.axis.chartPadding,
      right: styleVars.axis.chartPadding,
      left, bottom,
    },
    size
  )
  return newMargin
}

export function getMaxTextWidth(font = 'menlo', fontSize = 13, ticks) {
  const ctx = getRenderContext()
  ctx.save()
  ctx.font = `${fontSize}px ${font}`
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
    return {width: text.toString().length}
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
 * @return {object}
 */
export function getRenderContext() {
  if (cachedCtx) return cachedCtx
  if (global.document && global.document.createElement) {
    cachedCtx = document.createElement('canvas').getContext('2d')
    return cachedCtx
  }
  return ctxMock
}
