
import _ from 'lodash'
import {ACCESSORS_GROUPS} from '../../chartCore/defaults'

import {notDatum, isDatum} from '../../utils'

/*
`plotValue` is a helper to get back the mapped value plotted from a object.
It's used inside of the plotFunctions.
According to the configuration on the props provided it has different behaviours.
*/

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
  if (notDatum(mappedValue)) {
    const mappedValue2 = scale(_.get(d, key))
    if (isDatum(mappedValue2)) return mappedValue2
    return undefinedValue || defaultValue
  }
  return mappedValue
}
