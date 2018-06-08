// Copyright 2018 Kensho Technologies, LLC.

import {map, flatten, isNumber} from 'lodash'

import getPath2D from '../utils/getPath2D'

import getPlotValues from './getPlotValues'

function rangesRender(props, datum, idx) {
  const {backgroundOffset, plotRect} = props
  const path2D = getPath2D()
  const values = getPlotValues(props, datum, idx)
  if (isNumber(values.x1) && isNumber(values.x2) && isNumber(values.y1) && isNumber(values.y2)) {
    path2D.rect(values.x1, values.y1, values.x2 - values.x1, values.y2 - values.y1)
  } else if (isNumber(values.x1) && isNumber(values.x2)) {
    path2D.rect(
      values.x1,
      plotRect.y - backgroundOffset,
      values.x2 - values.x1,
      plotRect.height + backgroundOffset * 2
    )
  } else if (isNumber(values.y1) && isNumber(values.y2)) {
    path2D.rect(
      plotRect.x - backgroundOffset,
      values.y1,
      plotRect.width + backgroundOffset * 2,
      values.y2 - values.y1
    )
  }
  return {
    ...values,
    path2D,
    type: 'area',
  }
}

export default function ranges(props) {
  if (!props.xScale && !props.yScale) return undefined
  return map(flatten(props.data), (datum, idx) => rangesRender(props, datum, idx))
}
