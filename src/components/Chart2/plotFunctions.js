
import _ from 'lodash'
import utils from '../../utils'

const getX = (props, d) => {
  if (props.xValue) return props.xValue
  if (!props.xMap) return props.plotRect.x
  return props.xMap(d)
}
const getY = (props, d) => {
  if (props.yValue) return props.yValue
  if (!props.yMap) return props.plotRect.y
  return props.yMap(d)
}
export const pointsDataMap = (props, d) => {
  if (!props.xMap && !props.yMap) return undefined
  const path2D = utils.path()
  const x = getX(props, d)
  const y = getY(props, d)
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
