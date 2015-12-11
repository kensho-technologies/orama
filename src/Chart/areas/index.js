
import _ from 'lodash'
import {getPath2D} from '../../utils/path2DUtils'
import {getMaxY} from '../../utils/rectUtils'
import {plotValue} from '../plotValue'

const getPointData = (props, datum, yKey) => {
  const path2D = getPath2D()
  const x = plotValue(
    props, datum, 'x'
  )
  const y = plotValue(
    props, datum, yKey
  )
  const r = plotValue(props, datum, 'strokeWidth', 2) + 1
  path2D.arc(x, y, r, 0, 2 * Math.PI)
  return {
    hoverFill: 'black',
    path2D,
    type: 'area',
  }
}

const getHoverSolverObj = (props, renderDatum, hoverData) => ({
  hoverRenderData: [
    renderDatum,
    getPointData(props, hoverData, 'y'),
    getPointData(props, hoverData, 'y0'),
  ],
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

export const getArea = (props, data) => {
  const path2D = getPath2D()
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
  // if there's no base position accessors
  if (!props.y0 && !props.x0) {
    const y0 = props.yScale(0) || getMaxY(props.plotRect)
    path2D.lineTo(
      plotValue(props, _.last(data), 'x'),
      y0,
    )
    path2D.lineTo(
      plotValue(props, _.first(data), 'x'),
      y0,
    )
  // if the base is on the y axis
  } else if (props.y0 && !props.x0) {
    _.eachRight(data, d => {
      path2D.lineTo(
        plotValue(props, d, 'x'),
        plotValue(props, d, 'y0'),
      )
    })
  // if the base is on the x axis
  } else if (!props.y0 && props.x0) {
    _.eachRight(data, d => {
      path2D.lineTo(
        plotValue(props, d, 'x0'),
        plotValue(props, d, 'y'),
      )
    })
  }
  path2D.closePath()
  const fill = plotValue(props, _.first(data), 'fill')
  const alpha = plotValue(props, _.first(data), 'alpha')
  return {
    alpha,
    data,
    fill,
    hoverSolver,
    path2D,
    type: 'area',
  }
}
export const areas = props => {
  if (!props.xScale || !props.yScale) return undefined
  if (_.isArray(_.first(props.data))) {
    return _.reduce(
      props.data,
      (acc, data) => acc.concat(getArea(props, data)),
      []
    )
  }
  return [getArea(props, props.data)]
}
