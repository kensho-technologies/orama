
import {each} from 'lodash'
import {isArray} from 'lodash'
import {first} from 'lodash'
import {reduce} from 'lodash'
import {findIndex} from 'lodash'
import {get} from 'lodash'
import {last} from 'lodash'
import {find} from 'lodash'
import {getPath2D} from '../../utils/path2DUtils'
import {plotValue} from '../../plots/plotValue'

/*
`points` is used to generate render data for lines and multilines.
it handles `x`, `y`, 'stroke'(color) and 'lineWisdth'.

@calling logic
lines{
  getLineRenderData{}
}
*/

const getPointData = (props, datum) => {
  const path2D = getPath2D()
  const x = plotValue(
    props, datum, 'x'
  )
  const y = plotValue(
    props, datum, 'y'
  )
  const r = plotValue(props, datum, 'strokeWidth', 2) + 1.5
  path2D.arc(x, y, r, 0, 2 * Math.PI)
  return {
    hoverAlpha: 0.8,
    path2D,
    type: 'area',
  }
}

const getHoverSolverObj = (props, renderDatum, hoverData) => ({
  hoverRenderData: [renderDatum, getPointData(props, hoverData)],
  hoverData,
})

const hoverSolver = (
  props, _hoverData, renderDatum, localMouse
) => {
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

/*
generates the array of render data
*/
const getLineRenderData = (props, data) => {
  const path2D = getPath2D()
  const stroke = plotValue(props, first(data), 'stroke')
  const lineWidth = plotValue(
    props, first(data), 'lineWidth'
  )
  const lineDash = plotValue(
    props, first(data), 'lineDash'
  )
  path2D.moveTo(
    plotValue(props, first(data), 'x'),
    plotValue(props, first(data), 'y')
  )
  each(data, d => {
    path2D.lineTo(
      plotValue(props, d, 'x'),
      plotValue(props, d, 'y')
    )
  })
  return {
    data,
    hoverAlpha: 0.3,
    hoverSolver,
    lineDash,
    lineWidth,
    path2D,
    stroke,
    type: 'line',
  }
}
export const lines = props => {
  if (!props.xScale || !props.yScale) return undefined
  if (isArray(first(props.data))) {
    return reduce(
      props.data,
      (acc, data) => acc.concat(getLineRenderData(props, data)),
      []
    )
  }
  return [getLineRenderData(props, props.data)]
}
