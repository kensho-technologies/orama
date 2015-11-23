
import _ from 'lodash'
import utils from '../../../utils'
import {plotValue} from '../plotValue'

/*
`points` is used to generate render data for dots and similar.
it handles `x`, `y`, 'r'(radius) and 'color'(fill color).

@calling logic
points{
  pointsDataMap(retrievePoinstData){}
}
*/

/*
generates the array of render data
*/
export const pointsDataMap = (props, d) => {
  const path2D = utils.path()
  const x = plotValue(props, 'x', d, utils.rect.getMidX(props.plotRect))
  const y = plotValue(props, 'y', d, utils.rect.getMidY(props.plotRect))
  const r = plotValue(props, 'r', d, 5)
  const color = plotValue(props, 'color', d, 'steelblue')
  path2D.arc(x, y, r, 0, 2 * Math.PI)
  return {
    type: 'area',
    path2D,
    alpha: 1,
    fill: color,
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
