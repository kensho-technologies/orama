
import _ from 'lodash'
import {getPath2D} from '../../utils/path2DUtils'
import {plotValue} from '../plotValue'
import {extractTooltipData} from '../extractTooltipData'

const GUTTER = 1

const TOOLTIP_DIMENSIONS = [
  'x', 'x1', 'x2', 'y', 'fill',
]

const hoverSolver = (props, datum, renderDatum) => ({
  hoverData: [renderDatum],
  tooltipData: extractTooltipData(
    props,
    TOOLTIP_DIMENSIONS,
    datum
  ),
})

export const barsDataMap = (props, datum) => {
  const {barsGutter: gutter = GUTTER} = props
  const path2D = getPath2D()
  const x = plotValue(props, datum, 'x', props.plotRect.x)
  const y = plotValue(props, datum, 'y', props.plotRect.y)
  const fill = plotValue(props, datum, 'fill', 'steelblue')

  // when `x1` or `y1` is present, this means the bars are been positioned on a linear scale, and their position has been previously calculated
  if (props.x1 || props.y1) {
    if (props.x1) {
      const y0 = props.yScale(0)
      const x1 = plotValue(props, datum, 'x1', props.plotRect.x)
      const x2 = plotValue(props, datum, 'x2', props.plotRect.x)
      path2D.rect(
        x1 + gutter, y0,
        x2 - x1 - gutter * 2, y - y0
      )
    } else {
      const x0 = props.xScale(0)
      const y1 = plotValue(props, datum, 'y1', props.plotRect.x)
      const y2 = plotValue(props, datum, 'y2', props.plotRect.x)
      path2D.rect(
        x0, y1 - gutter,
        x - x0, y2 - y1 + gutter * 2,
      )
    }
  // one of the axis is ordinal, so the width of the bar is calculated by the number of itens on the domain
  } else if (props.yType === 'ordinal' || props.xType === 'ordinal') {
    if (props.xType === 'ordinal' || props.barOrientation === 'vertical') {
      const width = props.plotRect.width / props.xDomain.length
      const y0 = props.yScale(0)
      path2D.rect(
        x - width / 2 + gutter, y0,
        width - gutter * 2, y - y0
      )
    } else {
      const height = props.plotRect.height / props.yDomain.length
      const x0 = props.xScale(0)
      path2D.rect(
        x0, y - height / 2,
        x - x0, height - 2
      )
    }
  // fallback for the previous cases, bar with constant width
  } else {
    const width = 10
    if (props.barOrientation === 'horizontal') {
      const x0 = props.xScale(0)
      path2D.rect(
        x0, y - width / 2,
        x - x0, width - 2
      )
    } else {
      const y0 = props.yScale(0)
      path2D.rect(
        x - width / 2, y0,
        width, y - y0
      )
    }
  }
  const renderDatum = {
    type: 'area',
    path2D,
    alpha: 1,
    fill,
  }
  renderDatum.hoverSolver = _.partial(
    props.hoverSolver || hoverSolver,
    props,
    datum,
    renderDatum
  )
  return renderDatum
}
const retrieveBarsData = data => {
  if (_.isArray(_.first(data))) return _.flatten(data)
  return data
}
export const bars = props => {
  if (!props.xMap || !props.yMap) return undefined
  return _.map(
    retrieveBarsData(props.data),
    _.partial(barsDataMap, props)
  )
}
