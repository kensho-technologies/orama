
import _ from 'lodash'
import {getCachedContext} from '../../utils/canvasUtils'
import * as rectUtils from '../../utils/rectUtils'
import * as visUtils from '../../utils/visUtils'
import DEFAULT_THEME from '../defaultTheme'

const AXIS_LABEL_SPACING = 10
const DEFAULT_MARGIN = {
  left: 20, right: 20,
  top: 20, bottom: 20,
}

export const getMaxTextWidth = (theme, ticks) => {
  const {
    font,
    fontSize,
  } = theme
  const ctx = getCachedContext()
  ctx.save()
  ctx.font = `${fontSize}px ${font}`
  const maxWidth = _.reduce(
    ticks,
    (acc, d) => _.max([acc, ctx.measureText(d).width]),
    0
  )
  ctx.restore()
  return maxWidth
}

export const addPlotRect = props => {
  const {
    margin = DEFAULT_MARGIN,
    size,
    theme = DEFAULT_THEME,
    yDomain,
    yType,
  } = props
  const initialPlotRect = rectUtils.marginInset(margin, size)
  const yRange = props.yRange || visUtils.getRange('y', initialPlotRect, yType)
  const yTickCount = props.yTickCount || visUtils.getTickCount('y', yRange)
  const yTicks = props.yTicks || visUtils.getTicks(yType, yDomain, yTickCount)
  const yMaxTickWidth = getMaxTextWidth(theme, yTicks)
  const newMargin = {
    left: yMaxTickWidth + theme.axis.labelFontSize * 1.5 + margin.left + AXIS_LABEL_SPACING,
    bottom: theme.axis.labelFontSize * 1.5 + theme.axis.tickFontSize * 1.5 + margin.bottom + AXIS_LABEL_SPACING,
    top: margin.top,
    right: margin.right,
  }
  return {
    ...props,
    plotRect: rectUtils.marginInset(newMargin, size),
  }
}
