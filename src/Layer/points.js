// Copyright 2018 Kensho Technologies, LLC.

import {map, flatMap} from 'lodash'

import getMidX from '../utils/rect/getMidX'
import getMidY from '../utils/rect/getMidY'
import getPath2D from '../utils/getPath2D'

import getPlotValues from './getPlotValues'

/*
`points` is used to generate render data for dots and similar.
it handles `x`, `y`, 'radius' and 'fill'.

@calling logic
points{
  getPointRenderData(retrievePointsData){}
}
*/

/*
generates the array of render data
*/
function getPointRenderData(props, datum, idx) {
  const values = getPlotValues(props, datum, idx, {
    hoverAlpha: 0.75,
    radius: 4,
    x: getMidX(props.plotRect),
    y: getMidY(props.plotRect),
  })
  const path2D = getPath2D()
  const hover2ndPath2D = getPath2D()
  path2D.arc(values.x, values.y, values.radius, 0, 2 * Math.PI)
  hover2ndPath2D.arc(values.x, values.y, values.radius + 8, 0, 2 * Math.PI)

  return {
    ...values,
    hover2ndPath2D,
    path2D,
    type: 'area',
  }
}

// main entry point, if there's only `xMap` or `yMap` it will output a one dimension plot
export default function points(props) {
  if (!props.xScale && !props.yScale) return undefined
  return flatMap(
    props.data,
    (datum, idx) =>
      Array.isArray(datum)
        ? map(datum, (d, i) => getPointRenderData(props, d, i))
        : getPointRenderData(props, datum, idx)
  )
}
