
import _ from 'lodash'
import {getPath2D} from '../../utils/path2DUtils'
import {plotValue} from '../plotValue'

/*
`points` is used to generate render data for lines and multilines.
it handles `x`, `y`, 'stroke'(color) and 'lineWisdth'.

@calling logic
lines{
  getLine{}
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
    hoverFill: 'black',
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
const getLine = (props, data) => {
  const path2D = getPath2D()
  const stroke = plotValue(props, _.first(data), 'stroke')
  const lineWidth = plotValue(
    props, _.first(data), 'lineWidth'
  )
  path2D.moveTo(
    plotValue(props, _.first(data), 'x'),
    plotValue(props, _.first(data), 'y')
  )
  _.each(data, d => {
    path2D.lineTo(
      plotValue(props, d, 'x'),
      plotValue(props, d, 'y')
    )
  })
  return {
    data,
    hoverAlpha: props.hoverAlpha || 0.3,
    hoverSolver,
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
      (acc, data) => acc.concat(getLine(props, data)),
      []
    )
  }
  return [getLine(props, props.data)]
}
