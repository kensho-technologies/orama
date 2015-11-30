
import _ from 'lodash'
import {ACCESSORS_GROUPS} from '../defaults'

/*
`plotValue` is a helper to get back the mapped value plotted from a object.
It's used inside of the plotFunctions.
According to the configuration on the props provided it has different behaviours.
*/

const checkUndefined = value => (
  _.isUndefined(value) || _.isNaN(value) || _.isNull(value)
)
const generateAccessorGroupHash = _.memoize(
  accessorsGroups => _.reduce(
    accessorsGroups,
    (acc, values, key) => {
      _.each(values, d => acc[d] = key)
      return acc
    },
    {}
  )
)
export const getScaleKeyByHash = (props, key) => {
  const {
    accessorsGroups = ACCESSORS_GROUPS,
  } = props
  const hash = generateAccessorGroupHash(accessorsGroups)
  return hash[key] || key
}
/*
converts an accessor key back to the main of the group, if it exists.
*/
export const getScaleKey = (props, key) => {
  const {
    accessorsGroups = ACCESSORS_GROUPS,
  } = props
  return _.reduce(
    accessorsGroups,
    (acc, values, _key) => {
      if (_.contains(values, key)) return _key
      return acc
    },
    key
  )
}
export const plotValue = (
  props, d, key, defaultValue, undefinedValue
) => {
  const scaleKey = getScaleKeyByHash(props, key)
  const {
    [key]: accessor,
    [`${key}Value`]: value,
    [`${scaleKey}Scale`]: scale,
  } = props
  if (value) return value
  if (!scale) return defaultValue
  const mappedValue = scale(_.get(d, accessor))
  if (checkUndefined(mappedValue)) return undefinedValue
  return mappedValue
}
