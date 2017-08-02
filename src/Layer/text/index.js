// Copyright 2017 Kensho Technologies, Inc.

import {map, flatten} from 'lodash'
import {getMinX, getMinY} from '../../utils/rectUtils'
import {getMidX, getMidY} from '../../utils/rectUtils'
import {getMaxX, getMaxY} from '../../utils/rectUtils'
import {getPlotValues} from '../../Layer/getPlotValues'
import {fitCheckText} from '../../utils/textUtils'

/*
generates the array of render data
*/
export const getTextRenderData = (props, datum, idx) => {
  const {plotRect, theme, width, height} = props
  const values = getPlotValues(props, datum, idx, {
    x: getMidX(props.plotRect),
    y: getMidY(props.plotRect),
  })

  if (values.textSnap === 'top') values.y = getMinY(plotRect)
  if (values.textSnap === 'bottom') values.y = getMaxY(plotRect)
  if (values.textSnap === 'left') values.x = getMinX(plotRect)
  if (values.textSnap === 'right') values.x = getMaxX(plotRect)
  if (values.textSnap === 'topLeft') {
    values.x = getMinX(plotRect)
    values.y = getMinY(plotRect)
  }
  if (values.textSnap === 'topRight') {
    values.x = getMaxX(plotRect)
    values.y = getMinY(plotRect)
  }
  if (values.textSnap === 'bottomLeft') {
    values.x = getMinX(plotRect)
    values.y = getMaxY(plotRect)
  }
  if (values.textSnap === 'bottomRight') {
    values.x = getMaxX(plotRect)
    values.y = getMaxY(plotRect)
  }

  const newValues = fitCheckText(values, width, height, theme)

  return {
    ...newValues,
    type: 'text',
  }
}

/*
Main entry point, if there's only `xMap` or `yMap` it will output an one dimension plot.
*/
export const text = props => {
  if (!props.xScale && !props.yScale) return undefined
  return map(
    flatten(props.data),
    (datum, idx) => getTextRenderData(props, datum, idx),
  )
}
