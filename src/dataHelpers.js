// Copyright 2018 Kensho Technologies, LLC.

import {curry, keys, map, mapValues, reduce, slice, values} from 'lodash'

export const flow = (...arg) => reduce(slice(arg, 1), (acc, d) => d(acc), arg[0])

export const tidyMap = (array, func) =>
  map(array, value => (Array.isArray(value) ? map(value, func) : func(value)))

export const baseTransform = mapFunc => curry((arg, data) => tidyMap(data, mapFunc(arg)))

export const runTransArg = (arg, datum) =>
  mapValues(arg, funcString => {
    // eslint-disable-next-line no-new-func
    const func = new Function(...keys(datum), `return  ${funcString}`)
    return func(...values(datum))
  })

export const transMapFunc = arg => datum => ({
  ...datum,
  ...runTransArg(arg, datum),
})

export const trans = baseTransform(transMapFunc)
