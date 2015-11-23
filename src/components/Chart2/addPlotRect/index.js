
import _ from 'lodash'
import {getCachedContext} from '../../../utils/canvasUtils'
import {
  getRange,
  getTickCount,
  getTicks,
} from '../getMethods'
import {
  AXIS_OFFSET,
  BACKGROUND_OFFSET,
  SHOW_LABELS,
  SHOW_TICKS,
} from '../constants'
import * as rectUtils from '../../../utils/rectUtils'

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

const getTextWidth = (theme, string) => {
  const ctx = getCachedContext()
  ctx.save()
  ctx.font = `${theme.fontSize}px ${theme.fontMono}`
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
  ctx.font = `${theme.fontSize}px ${theme.fontMono}`
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
  if (margin.top) return margin.top + backgroundOffset
  if (yShowTicks === false || !y) return backgroundOffset
  return _.max([
    backgroundOffset,
    theme.fontSize / 2,
  ])
}
const getBottomMargin = props => {
  const {theme} = props
  const {
    backgroundOffset = BACKGROUND_OFFSET,
    dimensions,
    margin = {},
    xShowTicks = SHOW_TICKS,
    xShowLabel = SHOW_LABELS,
    xTickOffset = AXIS_OFFSET(theme),
    xLabelOffset = AXIS_OFFSET(theme),
  } = props
  if (margin.bottom) return margin.bottom + backgroundOffset
  if (!_.contains(dimensions, 'x')) return backgroundOffset
  return _.sum([
    backgroundOffset,
    xShowTicks ? xTickOffset + theme.fontSize : 0,
    xShowLabel ? xLabelOffset + theme.fontSize : 0,
  ])
}
const getLeftMargin = props => {
  const {theme} = props
  const {
    backgroundOffset = BACKGROUND_OFFSET,
    dimensions,
    margin = {},
    yShowTicks = SHOW_TICKS,
    yShowLabel = SHOW_LABELS,
    yTickOffset = AXIS_OFFSET(theme),
    yLabelOffset = AXIS_OFFSET(theme),
  } = props
  if (margin.left) return margin.left + backgroundOffset
  if (!_.contains(dimensions, 'y')) return backgroundOffset
  if (!yShowTicks) {
    return _.sum([
      backgroundOffset,
      yShowLabel ? yLabelOffset + theme.fontSize : 0,
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
    yShowLabel ? yLabelOffset + 5 + theme.fontSize : 0,
  ])
}
const getRightMargin = props => {
  const {theme} = props
  const {
    backgroundOffset = BACKGROUND_OFFSET,
    margin = {},
    x,
    xShowTicks = SHOW_TICKS,
  } = props
  if (margin.right) return margin.right + backgroundOffset
  if (!x || !xShowTicks) return backgroundOffset
  const xRange = props.xRange || getRange(props, 'x')
  const xTickCount = props.xTickCount || getTickCount({...props, xRange}, 'x')
  const xTicks = props.xTicks || getTicks({...props, xTickCount}, 'x')
  const xLastTickWidth = getTextWidth(theme, _.last(xTicks).text)
  return _.max([
    backgroundOffset,
    xLastTickWidth,
  ])
}

export const addPlotRect = props => {
  if (props.plotRect) return props
  const {
    dimensions,
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
  if (!_.contains(dimensions, 'x')) {
    plotRect.width = 0
  }
  if (!_.contains(dimensions, 'y')) {
    newSize.height -= plotRect.height
    plotRect.height = 0
  }
  return {
    ...props,
    margin,
    plotRect,
    size: newSize,
  }
}
