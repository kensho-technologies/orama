// Copyright 2018 Kensho Technologies, LLC.

import {flatten, map, isNumber} from 'lodash'

import getPath2D from '../utils/getPath2D'

import getPlotValues from './getPlotValues'

const GUTTER = 1

function getBarsRenderData(props, datum, idx) {
  const {barsGutter: gutter = GUTTER} = props
  const path2D = getPath2D()
  const values = getPlotValues(props, datum, idx, {
    x: props.plotRect.x,
    y: props.plotRect.y,
  })

  if (isNumber(values.x1) && isNumber(values.x2)) {
    // when `x1` or `y1` is present, this means the bars are been positioned on a linear scale,
    // and their position has been previously calculated
    const y0 = props.yScale(0)
    path2D.rect(values.x1 + gutter, y0, values.x2 - values.x1 - gutter * 2, values.y - y0)
  } else if (isNumber(values.y1) && isNumber(values.y2)) {
    const x0 = props.xScale(0)
    path2D.rect(x0, values.y1 - gutter, values.x - x0, values.y2 - values.y1 + gutter * 2)
  } else if (props.yType === 'ordinal' || props.xType === 'ordinal') {
    // one of the axis is ordinal, so the width of the bar is calculated by the number of itens on
    // the domain
    if (props.xType === 'ordinal' || props.barOrientation === 'vertical') {
      const width = props.plotRect.width / props.xDomain.length
      const y0 = props.yScale(0)
      path2D.rect(values.x - width / 2 + gutter, y0, width - gutter * 2, values.y - y0)
    } else {
      const height = props.plotRect.height / props.yDomain.length
      const x0 = props.xScale(0)
      path2D.rect(x0, values.y - height / 2, values.x - x0, height - 2)
    }
  } else {
    // fallback for the previous cases, bar with constant width
    const width = 10
    if (props.barOrientation === 'horizontal') {
      const x0 = props.xScale(0)
      path2D.rect(x0, values.y - width / 2, values.x - x0, width - 2)
    } else {
      const y0 = props.yScale(0)
      path2D.rect(values.x - width / 2, y0, width, values.y - y0)
    }
  }
  return {
    ...values,
    path2D,
    type: 'area',
  }
}

export default function bars(props) {
  if (!props.xScale || !props.yScale) return undefined
  return map(flatten(props.data), (datum, idx) => getBarsRenderData(props, datum, idx))
}
