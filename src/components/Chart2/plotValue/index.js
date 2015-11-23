
import _ from 'lodash'

/*
`plotValue` is a helper to get back the mapped value plotted from a object.
It's used inside of the plotFunctions.
According to the configuration on the props provided it has different behaviours.
*/

const checkUndefined = value => (
  _.isUndefined(value) || _.isNaN(value) || _.isNull(value)
)
export const plotValue = (props, key, d, defaultValue, undefinedValue) => {
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
