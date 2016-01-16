
import _ from 'lodash'
import {ACCESSORS_GROUPS} from '../../chartCore/defaults'

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
      /* eslint-disable no-param-reassign */
      _.each(values, d => acc[d] = key)
      /* eslint-enable no-param-reassign */
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
  if (checkUndefined(mappedValue)) {
    const mappedValue2 = scale(_.get(d, key))
    if (!checkUndefined(mappedValue2)) return mappedValue2
    return undefinedValue || defaultValue
  }
  return mappedValue
}
