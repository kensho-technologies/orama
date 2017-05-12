// Copyright 2017 Kensho Technologies, Inc.

import _ from 'lodash'
import {getCachedContext} from '../../utils/canvasUtils'
import {
  getRange,
  getTickCount,
  getTicks,
} from '../../chartCore/getForKey'
import {
  AXIS_LABEL_OFFSET,
  AXIS_TICK_OFFSET,
  BACKGROUND_OFFSET,
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
  if (!_.includes(groupedKeys, 'x')) return backgroundOffset
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
  if (!_.includes(groupedKeys, 'y')) return backgroundOffset
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
  return backgroundOffset
}

export const getPlotRect = props => {
  if (props.plotRect) return props
  const {
    backgroundOffset = BACKGROUND_OFFSET,
    groupedKeys,
    width,
    height = props.width * props.proportion,
  } = props

  const top = getTopMargin(props)
  const bottom = getBottomMargin(props)
  let partialPlotRect = rectUtils.marginInset({bottom, top}, {width, height})
  const left = getLeftMargin({...props, plotRect: partialPlotRect})
  partialPlotRect = rectUtils.marginInset({bottom, top, left}, {width, height})
  const right = getRightMargin({...props, plotRect: partialPlotRect})

  const margin = {
    left,
    bottom,
    top,
    right,
  }
  let newWidth = width
  let newHeight = height
  const plotRect = rectUtils.marginInset(margin, {width, height})
  if (!_.includes(groupedKeys, 'x')) {
    newWidth -= plotRect.width
    plotRect.width = 0
  }
  if (!_.includes(groupedKeys, 'y')) {
    newHeight -= plotRect.height
    plotRect.height = 0
  }
  if (plotRect.height < 0) {
    plotRect.height = 0
    newHeight = top + bottom
  }
  if (plotRect.width < 0) {
    plotRect.width = 0
    newWidth = left + right
  }
  return {
    backgroundOffset,
    margin,
    plotRect,
    width: newWidth,
    height: newHeight,
  }
}
