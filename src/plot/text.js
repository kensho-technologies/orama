// Copyright 2018 Kensho Technologies, LLC.

import {map, flatten} from 'lodash'

import getMinX from '../utils/rect/getMinX'
import getMinY from '../utils/rect/getMinY'
import getMidX from '../utils/rect/getMidX'
import getMidY from '../utils/rect/getMidY'
import getMaxX from '../utils/rect/getMaxX'
import getMaxY from '../utils/rect/getMaxY'
import fitCheckText from '../utils/fitCheckText'

import getPlotValues from './getPlotValues'

// generate the array of render data
function getTextRenderData(props, datum, idx) {
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
  return {...newValues, type: 'text'}
}

// if there's only `xMap` or `yMap`, output a one-dimensional plot
export default function text(props) {
  if (!props.xScale && !props.yScale) return undefined
  return map(flatten(props.data), (datum, idx) => getTextRenderData(props, datum, idx))
}
