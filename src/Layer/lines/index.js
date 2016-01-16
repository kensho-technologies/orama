
import _ from 'lodash'

import {getPath2D} from '../../utils/path2DUtils'
import {notPlotNumber} from '../../utils'
import {plotValue} from '../../Layer/plotValue'

/*
`points` is used to generate render data for lines and multilines.
it handles `x`, `y`, 'stroke'(color) and 'lineWisdth'.

@calling logic
lines{
  getLineRenderData{}
}
*/

export const getPointData = (props, datum) => {
  const path2D = getPath2D()
  const x = plotValue(
    props, datum, 'x'
  )
  const y = plotValue(
    props, datum, 'y'
  )
  const r = plotValue(props, datum, 'strokeWidth', 2) + 1.5
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
  hoverData,
})

export const hoverSolver = (
  props, _hoverData, renderDatum, localMouse
) => {
  const xRaw = props.xScale.invert(localMouse.x)
  if (props.xType === 'ordinal') {
    const hoverData = _.find(_hoverData, d => _.get(d, props.x) === xRaw)
    return getHoverSolverObj(props, renderDatum, hoverData)
  }
  const hoverIndex = _.findIndex(_hoverData, d => _.get(d, props.x) > xRaw)
  if (hoverIndex === 0) {
    const hoverData = _hoverData[hoverIndex]
    return getHoverSolverObj(props, renderDatum, hoverData)
  }
  if (hoverIndex === -1) {
    const hoverData = _.last(_hoverData)
    return getHoverSolverObj(props, renderDatum, hoverData)
  }
  const px = _.get(_hoverData[hoverIndex], props.x)
  const x = _.get(_hoverData[hoverIndex - 1], props.x)
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
  if (_.isEmpty(data)) return undefined
  const path2D = getPath2D()
  const stroke = plotValue(props, _.first(data), 'stroke')
  const lineWidth = plotValue(
    props, _.first(data), 'lineWidth'
  )
  const lineDash = plotValue(
    props, _.first(data), 'lineDash'
  )
  path2D.moveTo(
    plotValue(props, _.first(data), 'x', 0, 0),
    plotValue(props, _.first(data), 'y', 0, 0)
  )
  _.each(data, d => {
    const x = plotValue(props, d, 'x')
    const y = plotValue(props, d, 'y')
    if (notPlotNumber([x, y])) return
    path2D.lineTo(x, y)
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
  if (_.isArray(_.first(props.data))) {
    return _.reduce(
      props.data,
      (acc, data) => acc.concat(getLineRenderData(props, data)),
      []
    )
  }
  return [getLineRenderData(props, props.data)]
}
