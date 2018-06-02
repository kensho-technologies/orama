// Copyright 2018 Kensho Technologies, LLC.

import {map, flatten, isNumber} from 'lodash'

import getMinX from '../utils/rect/getMinX'
import getMaxX from '../utils/rect/getMaxX'
import getMinY from '../utils/rect/getMinY'
import getMaxY from '../utils/rect/getMaxY'
import getPath2D from '../utils/getPath2D'
import {BACKGROUND_OFFSET} from '../chartCore/defaults'

import getPlotValues from './getPlotValues'

function getGuideRenderData(props, datum, idx) {
  const {backgroundOffset = BACKGROUND_OFFSET, plotRect} = props
  const path2D = getPath2D()
  const values = getPlotValues(props, datum, idx)
  if (isNumber(values.x)) {
    path2D.moveTo(values.x, getMinY(plotRect) - backgroundOffset)
    path2D.lineTo(values.x, getMaxY(plotRect) + backgroundOffset)
  } else if (isNumber(values.y)) {
    path2D.moveTo(getMinX(plotRect) - backgroundOffset, values.y)
    path2D.lineTo(getMaxX(plotRect) + backgroundOffset, values.y)
  }
  return {...values, path2D, type: 'line'}
}

export default function guides(props) {
  if (!props.xScale && !props.yScale) return undefined
  return map(flatten(props.data), (datum, idx) => getGuideRenderData(props, datum, idx))
}
