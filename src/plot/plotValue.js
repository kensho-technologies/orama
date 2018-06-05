// Copyright 2018 Kensho Technologies, LLC.

import {isFunction, get} from 'lodash'

import notDatum from '../utils/notDatum'

import getScaleKeyByHash from './getScaleKeyByHash'

export const isDatum = value => !notDatum(value)

/*
`plotValue` is a helper to get back the mapped value plotted from a object.
It's used inside of the plotFunctions.
According to the configuration on the props provided it has different behaviours.

Plot values returns the value to be plotted from the input.
It has the following resolution order:
1. ${key}Value on the props
2. scaled data accessed with the accessor
3. ${key}Value on the data
4. defaultValue from arguments
5. value of datum[accessor] (can be undefined)
*/
export default function plotValue(props, datum, idx, key, defaultValue) {
  const scaleKey = getScaleKeyByHash(props, key)
  const {[key]: accessor, [`${key}Value`]: value, [`${scaleKey}Scale`]: scale} = props

  if (isFunction(value)) return value(props, datum, idx)
  if (isDatum(value)) return value
  const objValue = get(datum, accessor)
  if (scale) {
    const mappedValue = scale(objValue)
    if (isDatum(mappedValue) && isDatum(objValue)) return mappedValue
  }
  if (isDatum(objValue)) return objValue
  const objKeyValue = get(datum, `${key}Value`)
  if (isDatum(objKeyValue)) return objKeyValue
  return defaultValue || objValue
}
