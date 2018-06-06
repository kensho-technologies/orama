// Copyright 2018 Kensho Technologies, LLC.

import {includes, sum} from 'lodash'

import withCachedContext from '../utils/withCachedContext'
import marginInset from '../utils/rect/marginInset'
import {
  AXIS_LABEL_OFFSET,
  AXIS_TICK_OFFSET,
  BACKGROUND_OFFSET,
  SHOW_LABELS,
  SHOW_TICKS,
} from '../defaults'

import getRange from './getRange'
import getTicks from './getTicks'
import getTickCount from './getTickCount'

/*
`addPlotRect` calculate and assign the plotRect to a new props.
props.size gets insetted by props.margin to generate the plotRect.
when props.margin is not defined (or only partially defined), addPlotRect smartly calculates the margins, by taking into consideration axis label, ticks width and backgroundOffset.

@example
addPlotRect({size})
returns {size, plotRect}
*/

// get the maximum width of the strings contained in `ticks`
// uses a offscreen canvas for doing the measure and takes into consideration the theme object
export function getMaxTextWidth(theme, ticks) {
  return withCachedContext(ctx => {
    if (!ctx) return Math.max(...ticks.map(d => d.text.length))
    ctx.font = `${theme.axisTickFontSize}px ${theme.fontFamilyMono}`
    return Math.max(...ticks.map(d => ctx.measureText(d.text).width))
  })
}

function getTopMargin(props) {
  const {
    backgroundOffset = BACKGROUND_OFFSET,
    margin = {},
    theme,
    y,
    yShowTicks = SHOW_TICKS,
  } = props
  if (margin.top !== undefined) return margin.top + backgroundOffset
  if (yShowTicks === false || !y) return backgroundOffset
  return Math.max(backgroundOffset, theme.axisTickFontSize / 2)
}

function getBottomMargin(props) {
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
  if (margin.bottom !== undefined) return margin.bottom + backgroundOffset
  if (!includes(groupedKeys, 'x')) return backgroundOffset
  return sum([
    backgroundOffset,
    xShowTicks ? xTickOffset + theme.axisTickFontSize : 0,
    xShowLabel ? xLabelOffset + theme.axisLabelFontSize : 0,
  ])
}

function getLeftMargin(props) {
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
  if (margin.left !== undefined) return margin.left + backgroundOffset
  if (!includes(groupedKeys, 'y')) return backgroundOffset
  if (!yShowTicks) {
    return sum([backgroundOffset, yShowLabel ? yLabelOffset + theme.axisLabelFontSize : 0])
  }
  const yRange = props.yRange || getRange(props, 'y')
  const yTickCount = props.yTickCount || getTickCount({...props, yRange}, 'y')
  const yTicks = props.yTicks || getTicks({...props, yTickCount}, 'y')
  const yMaxTickWidth = getMaxTextWidth(theme, yTicks)
  return sum([
    backgroundOffset,
    yMaxTickWidth,
    yShowTicks ? yTickOffset : 0,
    yShowLabel ? yLabelOffset + 5 + theme.axisLabelFontSize : 0,
  ])
}

function getRightMargin(props) {
  const {backgroundOffset = BACKGROUND_OFFSET, margin = {}, x, xShowTicks = SHOW_TICKS} = props
  if (margin.right !== undefined) return margin.right + backgroundOffset
  if (!x || !xShowTicks) return backgroundOffset
  return backgroundOffset
}

export function getPlotRect(props) {
  if (props.plotRect) return props
  const {
    backgroundOffset = BACKGROUND_OFFSET,
    groupedKeys,
    width,
    height = props.width * props.proportion,
  } = props

  const top = getTopMargin(props)
  const bottom = getBottomMargin(props)
  let partialPlotRect = marginInset({bottom, top}, {width, height})
  const left = getLeftMargin({...props, plotRect: partialPlotRect})
  partialPlotRect = marginInset({bottom, top, left}, {width, height})
  const right = getRightMargin({...props, plotRect: partialPlotRect})

  const margin = {left, bottom, top, right}
  let newWidth = width
  let newHeight = height
  const plotRect = marginInset(margin, {width, height})
  if (!includes(groupedKeys, 'x')) {
    newWidth -= plotRect.width
    plotRect.width = 0
  }
  if (!includes(groupedKeys, 'y')) {
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
