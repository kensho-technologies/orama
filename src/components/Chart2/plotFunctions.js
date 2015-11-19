
import _ from 'lodash'
import utils from '../../utils'

const checkUndefined = value => (
  _.isUndefined(value) || _.isNaN(value) || _.isNull(value)
)
const getValue = (props, key, d, defaultValue, undefinedValue) => {
  const {
    [`${key}Value`]: value,
    [`${key}Map`]: map,
  } = props
  if (value) return value
  if (!map) return defaultValue
  const mappedValue = map(d)
  if (checkUndefined(mappedValue)) return undefinedValue
  return mappedValue
}
export const pointsDataMap = (props, d) => {
  const path2D = utils.path()
  const x = getValue(props, 'x', d, props.plotRect.x)
  const y = getValue(props, 'y', d, props.plotRect.y)
  const r = getValue(props, 'r', d, 5)
  const color = getValue(props, 'color', d, 'steelblue')
  path2D.arc(x, y, r, 0, 2 * Math.PI)
  return {
    type: 'area',
    path2D,
    alpha: 1,
    fill: color,
  }
}
export const points = () => (
  props => {
    if (!props.xMap && !props.yMap) return undefined
    return _.map(
      props.data,
      _.partial(pointsDataMap, props)
    )
  }
)
export const lines = () => (
  props => {
    if (!props.xMap || !props.yMap) return undefined
    const path2D = utils.path()
    path2D.moveTo(
      getValue(props, 'x', _.first(props.data)),
      getValue(props, 'y', _.first(props.data))
    )
    _.each(props.data, d => {
      path2D.lineTo(
        getValue(props, 'x', d),
        getValue(props, 'y', d)
      )
    })
    return {
      type: 'line',
      path2D,
    }
  }
)
