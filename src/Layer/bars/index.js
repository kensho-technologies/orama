
import {flatten, map, isNumber} from 'lodash'
import {getPath2D} from '../../utils/path2DUtils'
import {plotValue} from '../../Layer/plotValue'

const GUTTER = 1

export const getBarsRenderData = (props, datum) => {
  const {barsGutter: gutter = GUTTER} = props
  const path2D = getPath2D()
  const x = plotValue(props, datum, 'x', props.plotRect.x)
  const y = plotValue(props, datum, 'y', props.plotRect.y)
  const x1 = plotValue(props, datum, 'x1')
  const x2 = plotValue(props, datum, 'x2')
  const y1 = plotValue(props, datum, 'y1')
  const y2 = plotValue(props, datum, 'y2')
  const fill = plotValue(props, datum, 'fill')
  const alpha = plotValue(props, datum, 'alpha')

  // when `x1` or `y1` is present, this means the bars are been positioned on a linear scale, and their position has been previously calculated
  if (isNumber(x1) && isNumber(x2)) {
    const y0 = props.yScale(0)
    path2D.rect(
      x1 + gutter, y0,
      x2 - x1 - gutter * 2, y - y0
    )
  } else if (isNumber(y1) && isNumber(y2)) {
    const x0 = props.xScale(0)
    path2D.rect(
      x0, y1 - gutter,
      x - x0, y2 - y1 + gutter * 2,
    )
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
    alpha,
    fill,
    data: datum,
  }
}

export const bars = props => {
  if (!props.xScale || !props.yScale) return undefined
  return map(
    flatten(props.data),
    datum => getBarsRenderData(props, datum),
  )
}
