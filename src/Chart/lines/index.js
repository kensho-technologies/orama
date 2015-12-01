
import _ from 'lodash'
import {getPath2D} from '../../utils/path2DUtils'
import {plotValue} from '../plotValue'
import {extractTooltipData} from '../extractTooltipData'

/*
`points` is used to generate render data for lines and multilines.
it handles `x`, `y`, 'stroke'(color) and 'lineWisdth'.

@calling logic
lines{
  getLine{}
}
*/

const TOOLTIP_DIMENSIONS = [
  'x', 'y', 'stroke', 'strokeWidth',
]

const getPointData = (props, datum) => {
  const path2D = getPath2D()
  const x = plotValue(
    props, datum, 'x'
  )
  const y = plotValue(
    props, datum, 'y'
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
    hoverData: [renderDatum, getPointData(props, hoverPoint)],
    tooltipData: extractTooltipData(
      props,
      TOOLTIP_DIMENSIONS,
      hoverPoint,
    ),
  }
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
  const renderDatum = {
    type: 'line',
    path2D,
    stroke,
    lineWidth,
  }
  renderDatum.hoverSolver = _.partial(
    props.hoverSolver || getHoverSolver,
    props,
    data,
    renderDatum
  )
  return [renderDatum]
}
export const lines = props => {
  if (!props.xMap || !props.yMap) return undefined
  if (_.isArray(_.first(props.data))) {
    return _.reduce(
      props.data,
      (acc, data) => acc.concat(getLine(props, data)),
      []
    )
  }
  return getLine(props, props.data)
}
