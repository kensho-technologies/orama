
import _ from 'lodash'
import {getPath2D} from '../../utils/path2DUtils'
import {getMaxY} from '../../utils/rectUtils'
import {plotValue} from '../plotValue'
import {extractTooltipData} from '../extractTooltipData'

const TOOLTIP_DIMENSIONS = [
  'x', 'x0', 'y', 'y0', 'stroke', 'strokeWidth',
]

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

const getHoverSolver = (
  props, lineData, renderDatum, localMouse
) => {
  const xRaw = props.xScale.invert(localMouse.x)
  const hoverPoint = _.find(lineData, d => _.get(d, props.x) > xRaw)

  return {
    hoverData: [
      renderDatum,
      getPointData(props, hoverPoint, 'y'),
      getPointData(props, hoverPoint, 'y0'),
    ],
    tooltipData: extractTooltipData(
      props,
      TOOLTIP_DIMENSIONS,
      hoverPoint,
    ),
  }
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
  const renderDatum = {
    alpha,
    fill,
    path2D,
    type: 'area',
  }
  renderDatum.hoverSolver = _.partial(
    props.hoverSolver || getHoverSolver,
    props,
    data,
    renderDatum
  )
  return [renderDatum]
}
export const areas = props => {
  if (!props.xMap || !props.yMap) return undefined
  if (_.isArray(_.first(props.data))) {
    return _.reduce(
      props.data,
      (acc, data) => acc.concat(getArea(props, data)),
      []
    )
  }
  return getArea(props, props.data)
}
