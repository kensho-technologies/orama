// Copyright 2017 Kensho Technologies, LLC.

import {flatten, map, isNumber} from 'lodash'
import {getPath2D} from '../../utils/path2DUtils'
import {getPlotValues} from '../../Layer/getPlotValues'

const GUTTER = 1

export const getBarsRenderData = (props, datum, idx) => {
  const {barsGutter: gutter = GUTTER} = props
  const path2D = getPath2D()
  const values = getPlotValues(props, datum, idx, {
    x: props.plotRect.x,
    y: props.plotRect.y,
  })

  // when `x1` or `y1` is present, this means the bars are been positioned on a linear scale, and their position has been previously calculated
  if (isNumber(values.x1) && isNumber(values.x2)) {
    const y0 = props.yScale(0)
    path2D.rect(
      values.x1 + gutter, y0,
      values.x2 - values.x1 - gutter * 2, values.y - y0
    )
  } else if (isNumber(values.y1) && isNumber(values.y2)) {
    const x0 = props.xScale(0)
    path2D.rect(
      x0, values.y1 - gutter,
      values.x - x0, values.y2 - values.y1 + gutter * 2,
    )
  // one of the axis is ordinal, so the width of the bar is calculated by the number of itens on the domain
  } else if (props.yType === 'ordinal' || props.xType === 'ordinal') {
    if (props.xType === 'ordinal' || props.barOrientation === 'vertical') {
      const width = props.plotRect.width / props.xDomain.length
      const y0 = props.yScale(0)
      path2D.rect(
        values.x - width / 2 + gutter, y0,
        width - gutter * 2, values.y - y0
      )
    } else {
      const height = props.plotRect.height / props.yDomain.length
      const x0 = props.xScale(0)
      path2D.rect(
        x0, values.y - height / 2,
        values.x - x0, height - 2
      )
    }
  // fallback for the previous cases, bar with constant width
  } else {
    const width = 10
    if (props.barOrientation === 'horizontal') {
      const x0 = props.xScale(0)
      path2D.rect(
        x0, values.y - width / 2,
        values.x - x0, width - 2
      )
    } else {
      const y0 = props.yScale(0)
      path2D.rect(
        values.x - width / 2, y0,
        width, values.y - y0
      )
    }
  }
  return {
    ...values,
    path2D,
    type: 'area',
  }
}

export const bars = props => {
  if (!props.xScale || !props.yScale) return undefined
  return map(
    flatten(props.data),
    (datum, idx) => getBarsRenderData(props, datum, idx),
  )
}
