
import _ from 'lodash'
import utils from '../../utils'
import {plotValue} from '../plotValue'

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
  const path2D = utils.path()
  const x = plotValue(
    props, d, 'x', utils.rect.getMidX(props.plotRect)
  )
  const y = plotValue(
    props, d, 'y', utils.rect.getMidY(props.plotRect)
  )
  const r = plotValue(props, d, 'radius', 5)
  const fill = plotValue(props, d, 'fill')
  path2D.arc(x, y, r, 0, 2 * Math.PI)
  return {
    type: 'area',
    path2D,
    alpha: _.isUndefined(props.pointsAlpha) ? 1 : props.pointsAlpha,
    fill,
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
