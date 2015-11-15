
import _ from 'lodash'
import {getCachedContext} from '../../utils/canvasUtils'
import {
  getRange,
  getTickCount,
  getTicks,
} from './getMethods'
import * as rectUtils from '../../utils/rectUtils'
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
  } = props
  const initialPlotRect = rectUtils.marginInset(margin, size)
  const yRange = props.yRange || getRange({...props, plotRect: initialPlotRect}, 'y')
  const yTickCount = props.yTickCount || getTickCount({...props, yRange}, 'y')
  const yTicks = props.yTicks || getTicks({...props, yTickCount}, 'y')
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
