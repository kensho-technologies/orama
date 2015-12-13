
import _ from 'lodash'
import {getCachedContext} from '../../utils/canvasUtils'
import {
  getRange,
  getTickCount,
  getTicks,
} from '../getMethods'
import {
  AXIS_LABEL_OFFSET,
  AXIS_TICK_OFFSET,
  BACKGROUND_OFFSET,
  MARGIN_RIGHT,
  SHOW_LABELS,
  SHOW_TICKS,
} from '../defaults'
import * as rectUtils from '../../utils/rectUtils'

/*
`addPlotRect` calculate and assign the plotRect to a new props.
props.size gets insetted by props.margin to generate the plotRect.
when props.margin is not defined (or only partially defined), addPlotRect smartly calculates the margins, by taking into consideration axis label, ticks width and backgroundOffset.

@calling logic
addPlotRect{
  getTopMargin{}
  getBottomMargin{}
  getLeftMargin{
    getMaxTextWidth{}
  }
  getRightMargin{
    getTextWidth{}
  }
}

@example
addPlotRect({size})
returns {size, plotRect}
*/

export const getTextWidth = (theme, string) => {
  const ctx = getCachedContext()
  ctx.save()
  ctx.font = `${theme.axisTickFontSize}px ${theme.fontFamilyMono}`
  const width = ctx.measureText(string).width
  ctx.restore()
  return width
}
/*
get the maximum width of the strings contained in `ticks`.
Uses a offscreen canvas for doing the measure and takes into consideration the theme object.
*/
export const getMaxTextWidth = (theme, ticks) => {
  const ctx = getCachedContext()
  ctx.save()
  ctx.font = `${theme.axisTickFontSize}px ${theme.fontFamilyMono}`
  const maxWidth = _.reduce(
    ticks,
    (acc, d) => _.max([
      acc,
      ctx.measureText(d.text).width,
    ]),
    0
  )
  ctx.restore()
  return maxWidth
}
const getTopMargin = props => {
  const {
    backgroundOffset = BACKGROUND_OFFSET,
    margin = {},
    theme,
    y,
    yShowTicks = SHOW_TICKS,
  } = props
  if (!_.isUndefined(margin.top)) return margin.top + backgroundOffset
  if (yShowTicks === false || !y) return backgroundOffset
  return _.max([
    backgroundOffset,
    theme.axisTickFontSize / 2,
  ])
}
const getBottomMargin = props => {
  const {theme} = props
  const {
    backgroundOffset = BACKGROUND_OFFSET,
    groupedKeys,
    margin = {},
    xShowTicks = SHOW_TICKS,
    xShowLabel = SHOW_LABELS,
    xTickOffset = AXIS_TICK_OFFSET(theme),
    xLabelOffset = AXIS_LABEL_OFFSET(theme),
  } = props
  if (!_.isUndefined(margin.bottom)) return margin.bottom + backgroundOffset
  if (!_.contains(groupedKeys, 'x')) return backgroundOffset
  return _.sum([
    backgroundOffset,
    xShowTicks ? xTickOffset + theme.axisTickFontSize : 0,
    xShowLabel ? xLabelOffset + theme.axisLabelFontSize : 0,
  ])
}
const getLeftMargin = props => {
  const {theme} = props
  const {
    backgroundOffset = BACKGROUND_OFFSET,
    groupedKeys,
    margin = {},
    yShowTicks = SHOW_TICKS,
    yShowLabel = SHOW_LABELS,
    yTickOffset = AXIS_TICK_OFFSET(theme),
    yLabelOffset = AXIS_LABEL_OFFSET(theme),
  } = props
  if (!_.isUndefined(margin.left)) return margin.left + backgroundOffset
  if (!_.contains(groupedKeys, 'y')) return backgroundOffset
  if (!yShowTicks) {
    return _.sum([
      backgroundOffset,
      yShowLabel ? yLabelOffset + theme.axisLabelFontSize : 0,
    ])
  }
  const yRange = props.yRange || getRange(props, 'y')
  const yTickCount = props.yTickCount || getTickCount({...props, yRange}, 'y')
  const yTicks = props.yTicks || getTicks({...props, yTickCount}, 'y')
  const yMaxTickWidth = getMaxTextWidth(theme, yTicks)
  return _.sum([
    backgroundOffset,
    yMaxTickWidth,
    yShowTicks ? yTickOffset : 0,
    yShowLabel ? yLabelOffset + 5 + theme.axisLabelFontSize : 0,
  ])
}
const getRightMargin = props => {
  const {
    backgroundOffset = BACKGROUND_OFFSET,
    margin = {},
    x,
    xShowTicks = SHOW_TICKS,
  } = props
  if (!_.isUndefined(margin.right)) return margin.right + backgroundOffset
  if (!x || !xShowTicks) return backgroundOffset
  return MARGIN_RIGHT
}

export const addPlotRect = props => {
  if (props.plotRect) return props
  const {
    backgroundOffset = BACKGROUND_OFFSET,
    groupedKeys,
    size,
  } = props

  const top = getTopMargin(props)
  const bottom = getBottomMargin(props)
  let partialPlotRect = rectUtils.marginInset({bottom, top}, size)
  const left = getLeftMargin({...props, plotRect: partialPlotRect})
  partialPlotRect = rectUtils.marginInset({bottom, top, left}, size)
  const right = getRightMargin({...props, plotRect: partialPlotRect})

  const margin = {
    left,
    bottom,
    top,
    right,
  }
  const newSize = _.clone(size)
  const plotRect = rectUtils.marginInset(margin, size)
  if (!_.contains(groupedKeys, 'x')) {
    plotRect.width = 0
  }
  if (!_.contains(groupedKeys, 'y')) {
    newSize.height -= plotRect.height
    plotRect.height = 0
  }
  return {
    ...props,
    backgroundOffset,
    margin,
    plotRect,
    size: newSize,
  }
}
