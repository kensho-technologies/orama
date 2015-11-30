
import _ from 'lodash'
import {getPath2D} from '../../utils/path2DUtils'
import {getMidX, getMidY} from '../../utils/rectUtils'
import {plotValue} from '../plotValue'
import {extractTooltipData} from '../extractTooltipData'

/*
`points` is used to generate render data for dots and similar.
it handles `x`, `y`, 'radius' and 'fill'.

@calling logic
points{
  pointsDataMap(retrievePoinstData){}
}
*/

/*
generates the array of render data
*/
export const pointsDataMap = (props, d) => {
  const path2D = getPath2D()
  const x = plotValue(
    props, d, 'x', getMidX(props.plotRect)
  )
  const y = plotValue(
    props, d, 'y', getMidY(props.plotRect)
  )
  const r = plotValue(props, d, 'radius', 5)
  const fill = plotValue(props, d, 'fill')
  path2D.arc(x, y, r, 0, 2 * Math.PI)
  const tooltipData = extractTooltipData(props, d)
  return {
    alpha: _.isUndefined(props.pointsAlpha) ? 1 : props.pointsAlpha,
    fill,
    path2D,
    tooltipData,
    type: 'area',
  }
}
/*
If array of arrays (grouped data), flatten before sending to `pointsDataMap`.
There's no reason for the points plot to deal with grouped data
*/
const retrievePoinstData = data => {
  if (_.isArray(_.first(data))) return _.flatten(data)
  return data
}
/*
Main entry point, if there's only `xMap` or `yMap` it will output an one dimension plot.
*/
export const points = props => {
  if (!props.xMap && !props.yMap) return undefined
  return _.map(
    retrievePoinstData(props.data),
    _.partial(pointsDataMap, props)
  )
}
