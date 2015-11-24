
import _ from 'lodash'
import utils from '../../utils'
import {plotValue} from '../plotValue'
import {points} from '../points'

/*
`points` is used to generate render data for lines and multilines.
it handles `x`, `y`, 'stroke'(color) and 'lineWisdth'.

@calling logic
lines{
  getLine{}
}
*/

/*
generates the array of render data
*/
const getLine = (props, data) => {
  const path2D = utils.path()
  const stroke = plotValue(props, 'stroke', _.first(data))
  const lineWidth = plotValue(props, 'lineWidth', _.first(data))
  path2D.moveTo(
    plotValue(props, 'x', _.first(data)),
    plotValue(props, 'y', _.first(data))
  )
  _.each(data, d => {
    path2D.lineTo(
      plotValue(props, 'x', d),
      plotValue(props, 'y', d)
    )
  })
  const lineData = {
    type: 'line',
    path2D,
    stroke,
    lineWidth,
  }
  const pointData = points({
    ...props,
    data,
    pointsAlpha: props.linesShowPoints === false ? 0 : undefined,
    fillValue: stroke,
  })
  return [].concat(lineData, pointData)
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
