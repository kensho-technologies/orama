// Copyright 2018 Kensho Technologies, LLC.

import {find, findIndex, get, head, isEmpty, isArray, last, reduce, some} from 'lodash'

import {getPath2D} from '../../utils/path2DUtils'
import {notPlotNumber} from '../../utils'
import {plotValue} from '../plotValue'
import getPlotValues from '../getPlotValues'
import {splineInterpolation} from '../splineInterpolation'

/*
`points` is used to generate render data for lines and multilines.
it handles `x`, `y`, 'stroke'(color) and 'lineWisdth'.

@calling logic
lines{
  getLineRenderData{}
}
*/

export function getPointData(props, datum) {
  const path2D = getPath2D()
  const x = plotValue(props, datum, undefined, 'x')
  const y = plotValue(props, datum, undefined, 'y')
  const r = plotValue(props, datum, undefined, 'strokeWidth', 2) + 1.5
  if (notPlotNumber([x, y, r])) return undefined
  path2D.arc(x, y, r, 0, 2 * Math.PI)
  return {
    hoverAlpha: 0.8,
    path2D,
    type: 'area',
  }
}

const getHoverSolverObj = (props, renderDatum, hoverData) => ({
  hoverRenderData: [renderDatum, getPointData(props, hoverData)],
  renderDatum,
  hoverData,
})

export function hoverSolver(props, _hoverData, renderDatum, localMouse) {
  const xRaw = props.xScale.invert(localMouse.x)
  if (props.xType === 'ordinal') {
    const hoverData = find(_hoverData, d => get(d, props.x) === xRaw)
    return getHoverSolverObj(props, renderDatum, hoverData)
  }
  const hoverIndex = findIndex(_hoverData, d => get(d, props.x) > xRaw)
  if (hoverIndex === 0) {
    const hoverData = _hoverData[hoverIndex]
    return getHoverSolverObj(props, renderDatum, hoverData)
  }
  if (hoverIndex === -1) {
    const hoverData = last(_hoverData)
    return getHoverSolverObj(props, renderDatum, hoverData)
  }
  const px = get(_hoverData[hoverIndex], props.x)
  const x = get(_hoverData[hoverIndex - 1], props.x)
  if (xRaw - px < x - xRaw) {
    const hoverData = _hoverData[hoverIndex - 1]
    return getHoverSolverObj(props, renderDatum, hoverData)
  }
  const hoverData = _hoverData[hoverIndex]
  return getHoverSolverObj(props, renderDatum, hoverData)
}

// generate the array of render data
function getLineRenderData(props, data, idx) {
  if (isEmpty(data)) return undefined
  const path2D = getPath2D()
  const values = getPlotValues(props, head(data), idx, {
    hoverAlpha: 0.2,
  })
  if (props.interpolate) {
    splineInterpolation(props, data, path2D)
  } else {
    path2D.moveTo(values.x, values.y)
    reduce(
      data,
      (shouldDrawPoint, d) => {
        const x = plotValue(props, d, idx, 'x')
        const y = plotValue(props, d, idx, 'y')
        if (notPlotNumber([x, y])) return false
        if (shouldDrawPoint) path2D.lineTo(x, y)
        else path2D.moveTo(x, y)
        return true
      },
      true
    )
  }
  return {
    ...values,
    data,
    hoverSolver,
    path2D,
    type: 'line',
  }
}

export default function lines(props) {
  if (!props.xScale || !props.yScale) return undefined
  if (some(props.data, isArray)) {
    return reduce(
      props.data,
      (acc, data, idx) => acc.concat(getLineRenderData(props, data, idx)),
      []
    )
  }
  return [getLineRenderData(props, props.data)]
}
