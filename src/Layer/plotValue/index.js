// Copyright 2018 Kensho Technologies, LLC.

import _ from 'lodash'

import {ACCESSORS_GROUPS} from '../../chartCore/defaults'
import {isDatum} from '../../utils'

/*
`plotValue` is a helper to get back the mapped value plotted from a object.
It's used inside of the plotFunctions.
According to the configuration on the props provided it has different behaviours.
*/

const generateAccessorGroupHash = _.memoize(accessorsGroups =>
  _.reduce(
    accessorsGroups,
    (acc, values, key) => {
      /* eslint-disable no-param-reassign */
      _.each(values, d => {
        acc[d] = key
      })
      /* eslint-enable no-param-reassign */
      return acc
    },
    {}
  )
)

/*
getScaleKeyByHash is used to return the main key for a group of accessors.
For example, x, x0, x1 and x2 all will return 'x'
*/
export const getScaleKeyByHash = (props, key) => {
  const {accessorsGroups = ACCESSORS_GROUPS} = props
  const hash = generateAccessorGroupHash(accessorsGroups)
  return hash[key] || key
}

/*
Plot values returns the value to be plotted from the input.
It has the following resolution order:
1. ${key}Value on the props
2. scaled data accessed with the accessor
3. ${key}Value on the data
4. defaultValue from arguments
5. value of datum[accessor] (can be undefined)
*/
export const plotValue = (props, datum, idx, key, defaultValue) => {
  const scaleKey = getScaleKeyByHash(props, key)
  const {[key]: accessor, [`${key}Value`]: value, [`${scaleKey}Scale`]: scale} = props

  if (_.isFunction(value)) return value(props, datum, idx)
  if (isDatum(value)) return value
  const objValue = _.get(datum, accessor)
  if (scale) {
    const mappedValue = scale(objValue)
    if (isDatum(mappedValue) && isDatum(objValue)) return mappedValue
  }
  if (isDatum(objValue)) return objValue
  const objKeyValue = _.get(datum, `${key}Value`)
  if (isDatum(objKeyValue)) return objKeyValue
  return defaultValue || objValue
}

export const isNullPoint = props => (datum, idx) =>
  plotValue(props, datum, idx, 'x', null) === null ||
  plotValue(props, datum, idx, 'x0', null) === null ||
  plotValue(props, datum, idx, 'y', null) === null ||
  plotValue(props, datum, idx, 'y0', null) === null
