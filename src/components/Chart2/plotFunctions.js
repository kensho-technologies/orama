
import _ from 'lodash'
import utils from '../../utils'

export const pointsDataMap = (props, d) => {
  if (!props.xMap || !props.yMap) return []
  const path2D = utils.path()
  const x = props.xValue || props.xMap(d)
  const y = props.yValue || props.yMap(d)
  path2D.arc(x, y, 5, 0, 2 * Math.PI)
  return {
    type: 'area',
    path2D,
  }
}
export const points = props => (
  _.map(
    props.data,
    _.partial(pointsDataMap, props)
  )
)
