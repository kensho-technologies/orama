
import utils from '../utils'
import R from 'ramda'

import {DEFAULT_THEME} from '../defaultTheme'
import {getCachedContext} from '../utils/canvasUtils'

const defaultMargin = {
  left: 20, right: 20,
  top: 20, bottom: 60,
}

export function calculateMargin(opts) {
  const {size, yType, yDomain} = opts
  const styleVars = opts.styleVars || DEFAULT_THEME
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
  const ctx = getCachedContext()
  ctx.save()
  ctx.font = `${fontSize}px ${font}`
  const maxSize = R.reduce((reducedSize, d) => {
    const size = ctx.measureText(d).width
    return R.max(size, reducedSize)
  }, 0, ticks)
  ctx.restore()
  return maxSize
}
