
import _ from 'lodash'
import utils from '../../utils'
import {plotValue} from '../plotValue'

const GUTTER = 1

export const barsDataMap = (props, d) => {
  const {barsGutter: gutter = GUTTER} = props
  const path2D = utils.path()
  const x = plotValue(props, d, 'x', props.plotRect.x)
  const y = plotValue(props, d, 'y', props.plotRect.y)
  const fill = plotValue(props, d, 'fill', 'steelblue')

  // when `x1` or `y1` is present, this means the bars are been positioned on a linear scale, and their position has been previously calculated
  if (props.x1 || props.y1) {
    if (props.x1) {
      const y0 = props.yScale(0)
      const x1 = plotValue(props, d, 'x1', props.plotRect.x)
      const x2 = plotValue(props, d, 'x2', props.plotRect.x)
      path2D.rect(
        x1 + gutter, y0,
        x2 - x1 - gutter * 2, y - y0
      )
    } else {
      const x0 = props.xScale(0)
      const y1 = plotValue(props, d, 'y1', props.plotRect.x)
      const y2 = plotValue(props, d, 'y2', props.plotRect.x)
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
  return {
    type: 'area',
    path2D,
    alpha: 1,
    fill,
  }
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
