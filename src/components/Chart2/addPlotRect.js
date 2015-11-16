
import _ from 'lodash'
import {getCachedContext} from '../../utils/canvasUtils'
import {
  getRange,
  getTickCount,
  getTicks,
} from './getMethods'
import * as rectUtils from '../../utils/rectUtils'

const getTextWidth = (theme, string) => {
  const ctx = getCachedContext()
  ctx.save()
  ctx.font = `${theme.fontSize}px ${theme.fontMono}`
  const width = ctx.measureText(string).width
  ctx.restore()
  return width
}
export const getMaxTextWidth = (theme, ticks) => {
  const ctx = getCachedContext()
  ctx.save()
  ctx.font = `${theme.fontSize}px ${theme.fontMono}`
  const maxWidth = _.reduce(
    ticks,
    (acc, d) => _.max([acc, ctx.measureText(d).width]),
    0
  )
  ctx.restore()
  return maxWidth
}
const getTopMargin = props => {
  const {
    backgroundOffset,
    margin = {},
    theme,
    y,
    yShowTicks = true,
  } = props
  if (margin.top) return margin.top + backgroundOffset
  if (yShowTicks === false || !y) return backgroundOffset
  return _.max([
    backgroundOffset,
    theme.fontSize / 2,
  ])
}
const getBottomMargin = props => {
  const {theme} = props
  const defaultOffset = theme.fontSize * (theme.lineHeight - 1)
  const {
    backgroundOffset,
    margin = {},
    x,
    xShowTicks = true,
    xShowLabel = true,
    xTickOffset = defaultOffset,
    xLabelOffset = defaultOffset,
  } = props
  if (margin.bottom) return margin.bottom + backgroundOffset
  if (!x) return backgroundOffset
  return _.sum([
    backgroundOffset,
    xShowTicks ? xTickOffset + theme.fontSize : 0,
    xShowLabel ? xLabelOffset + theme.fontSize : 0,
  ])
}
const getLeftMargin = props => {
  const {theme} = props
  const defaultOffset = theme.fontSize * (theme.lineHeight - 1)
  const {
    backgroundOffset,
    margin = {},
    y,
    yShowTicks = true,
    yShowLabel = true,
    yTickOffset = defaultOffset,
    yLabelOffset = defaultOffset,
  } = props
  if (margin.left) return margin.left + backgroundOffset
  if (!y) return backgroundOffset
  if (!yShowTicks) return _.sum([
    backgroundOffset,
    yShowLabel ? yLabelOffset + theme.fontSize : 0,
  ])
  const yRange = props.yRange || getRange(props, 'y')
  const yTickCount = props.yTickCount || getTickCount({...props, yRange}, 'y')
  const yTicks = props.yTicks || getTicks({...props, yTickCount}, 'y')
  const yMaxTickWidth = getMaxTextWidth(theme, yTicks)
  return _.sum([
    backgroundOffset,
    yMaxTickWidth,
    yShowTicks ? yTickOffset : 0,
    yShowLabel ? yLabelOffset + 5 + theme.fontSize : 0,
  ])
}
const getRightMargin = props => {
  const {theme} = props
  const defaultOffset = theme.fontSize * (theme.lineHeight - 1)
  const {
    backgroundOffset,
    margin = {},
    x,
    xShowTicks = true,
  } = props
  if (margin.right) return margin.right + backgroundOffset
  if (!x || !xShowTicks) return backgroundOffset
  const xRange = props.xRange || getRange(props, 'x')
  const xTickCount = props.xTickCount || getTickCount({...props, xRange}, 'x')
  const xTicks = props.xTicks || getTicks({...props, xTickCount}, 'x')
  const xLastTickWidth = getTextWidth(theme, _.last(xTicks))
  return _.max([
    backgroundOffset,
    xLastTickWidth,
  ])
}

export const addPlotRect = props => {
  if (props.plotRect) return props
  const {
    size,
    theme,
    backgroundOffset,
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
  return {
    ...props,
    margin,
    plotRect: rectUtils.marginInset(margin, size),
  }
}
