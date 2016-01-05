
import {
  isArray, first, last, reduce, findIndex, get,
  each, eachRight, isNumber, find,
} from 'lodash'
import {getPath2D} from '../../utils/path2DUtils'
import {getMaxY} from '../../utils/rectUtils'
import {plotValue} from '../../plots/plotValue'

const getPointData = (props, datum, yKey) => {
  const path2D = getPath2D()
  const x = plotValue(
    props, datum, 'x'
  )
  const y = plotValue(
    props, datum, yKey
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

export const getAreaRenderData = (props, data) => {
  const path2D = getPath2D()
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
  const y0 = plotValue(props, first(data), 'y0')
  const x0 = plotValue(props, first(data), 'x0')
  // if there's no base position accessors
  if (!isNumber(y0) && !isNumber(x0)) {
    const localY0 = props.yScale(0) || getMaxY(props.plotRect)
    path2D.lineTo(
      plotValue(props, last(data), 'x'),
      localY0,
    )
    path2D.lineTo(
      plotValue(props, first(data), 'x'),
      localY0,
    )
  // if the base is on the y axis
  } else if (isNumber(y0) && !isNumber(x0)) {
    eachRight(data, d => {
      path2D.lineTo(
        plotValue(props, d, 'x'),
        plotValue(props, d, 'y0'),
      )
    })
  // if the base is on the x axis
  } else if (!isNumber(y0) && isNumber(x0)) {
    eachRight(data, d => {
      path2D.lineTo(
        plotValue(props, d, 'x0'),
        plotValue(props, d, 'y'),
      )
    })
  }
  path2D.closePath()
  const fill = plotValue(props, first(data), 'fill')
  const stroke = plotValue(props, first(data), 'fill')
  const alpha = plotValue(props, first(data), 'alpha')
  return {
    hoverAlpha: 0.25,
    alpha,
    data,
    fill,
    stroke,
    hoverSolver,
    path2D,
    type: 'area',
  }
}
export const areas = props => {
  if (!props.xScale || !props.yScale) return undefined
  if (isArray(first(props.data))) {
    return reduce(
      props.data,
      (acc, data) => acc.concat(getAreaRenderData(props, data)),
      []
    )
  }
  return [getAreaRenderData(props, props.data)]
}
