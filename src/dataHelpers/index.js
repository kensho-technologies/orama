// Copyright 2018 Kensho Technologies, LLC.

import _ from 'lodash'

export const flow = (...arg) =>
  _.reduce(
    _.slice(arg, 1),
    (acc, d) => d(acc),
    arg[0]
  )

export const tidyMap = (array, func) =>
  _.map(
    array,
    value => {
      if (_.isArray(value)) {
        return _.map(value, func)
      }
      return func(value)
    }
  )

export const baseTransform = mapFunc =>
  _.curry((arg, data) => tidyMap(data, mapFunc(arg)))

//

export const runTransArg = (arg, datum) =>
  _.mapValues(
    arg,
    funcString => {
      const func = new Function(
        ..._.keys(datum), `return  ${funcString}`
      )
      return func(..._.values(datum))
    }
  )

export const transMapFunc = arg =>
  datum => ({
    ...datum,
    ...runTransArg(arg, datum),
  })

export const trans = baseTransform(transMapFunc)
