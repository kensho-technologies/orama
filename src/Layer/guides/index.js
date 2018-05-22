// Copyright 2018 Kensho Technologies, LLC.

import {map, flatten, isNumber} from 'lodash'

import {getMinX, getMaxX, getMinY, getMaxY} from '../../utils/rectUtils'
import {getPath2D} from '../../utils/path2DUtils'
import {BACKGROUND_OFFSET} from '../../chartCore/defaults'
import {getPlotValues} from '../getPlotValues'

const getGuideRenderData = (props, datum, idx) => {
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

  return {
    ...values,
    path2D,
    type: 'line',
  }
}

export const guides = props => {
  if (!props.xScale && !props.yScale) return undefined
  return map(flatten(props.data), (datum, idx) => getGuideRenderData(props, datum, idx))
}
