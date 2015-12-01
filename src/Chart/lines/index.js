
import _ from 'lodash'
import {getPath2D} from '../../utils/path2DUtils'
import {plotValue} from '../plotValue'
import {pointsDataMap} from '../points'
import {extractTooltipData} from '../extractTooltipData'

/*
`points` is used to generate render data for lines and multilines.
it handles `x`, `y`, 'stroke'(color) and 'lineWisdth'.

@calling logic
lines{
  getLine{}
}
*/

const getHoverSolver = (props, data) => mouse => {
  const xRaw = props.xScale.invert(mouse.x)
  const hoverPoint = _.find(data, d => _.get(d, props.x) > xRaw)
  return {
    hoverData: pointsDataMap(props, hoverPoint),
    tooltipData: extractTooltipData(props, hoverPoint),
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
  const lineData = {
    type: 'line',
    path2D,
    stroke,
    lineWidth,
    hoverSolver: getHoverSolver(props, data),
    tooltipData: {
      title: 'TEST',
    },
  }
  return [lineData]
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
