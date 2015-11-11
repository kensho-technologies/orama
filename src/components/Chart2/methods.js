
import _ from 'lodash'
import * as visUtils from '../../utils/visUtils'
import {ACCESSORS_NAMES} from './getDataValues'

/*
reorder and curry reduce funtion to
reduceFp(accumulator, iteratee, collection)
*/
const reduceFp = _.curry(_.rearg(_.reduce, 2, 1, 0), 3)
/*
Transform 'dataValues' into 'params'

dataValuesToParams({x: [1, 2, 3], y: [10, 11, 12]})
return {x: {data: [1, 2, 3], y: {data: [10, 11, 12]}}}
*/
export const dataValuesToParams = reduceFp({},
  (acc, data, key) => {
    acc[key] = {
      data,
    }
    return acc
  }
)
/*
get the type from an array of values
can return 'string, 'number' or 'date'

getTypeFromArray([1, 2, 3, 'a'])
return 'number'
*/
export const getTypeFromArray = array => {
  const counter = _.reduce(
    array,
    (acc, d) => {
      acc[visUtils.toType(d)] ++
      return acc
    },
    {number: 0, string: 0, date: 0}
  )
  const counterPairs = _.pairs(counter)
  const maxName = _.max(counterPairs, '1')[0]
  return visUtils.JS_TO_VIS_TYPE[maxName]
}
/*
return domain of the array according to the input type
*/
export function getDomainFromArray(array, type = 'linear') {
  switch (type) {
  case 'ordinal':
    return _.uniq(array)
  default:
    return [_.min(array), _.max(array)]
  }
}
/*
add types for each one of the params, if the type is missing

addTypesToParams({ x: { data: [1, 2, 3] } })
return { x: { data: [ 1, 2, 3 ], type: 'number' } }
*/
export const addTypeToParams = params => (
  _.reduce(
    params,
    (acc, value, key) => {
      if (!_.includes(ACCESSORS_NAMES, key)) return acc
      if (value.type) {
        acc[key] = value
        return acc
      }
      acc[key] = {
        ...value,
        type: getTypeFromArray(value.data),
      }
      return acc
    },
    {...params}
  )
)
export const addDomainToParams = params => (
  _.reduce(
    params,
    (acc, value, key) => {
      if (!_.includes(ACCESSORS_NAMES, key)) return acc
      if (value.domain) {
        acc[key] = value
        return acc
      }
      acc[key] = {
        ...value,
        domain: getDomainFromArray(value.data, value.type),
      }
      return acc
    },
    {...params}
  )
)
export const addRangeToParams = params => (
  _.reduce(
    params,
    (acc, value, key) => {
      if (!_.includes(ACCESSORS_NAMES, key)) return acc
      if (value.range) {
        acc[key] = value
        return acc
      }
      acc[key] = {
        ...value,
        range: visUtils.getRange(key, params.plotRect, value.type),
      }
      return acc
    },
    {...params}
  )
)
export const addTickCountToParams = params => (
  _.reduce(
    params,
    (acc, value, key) => {
      if (!_.includes(ACCESSORS_NAMES, key)) return acc
      if (value.tickCount) {
        acc[key] = value
        return acc
      }
      acc[key] = {
        ...value,
        tickCount: visUtils.getTickCount(key, value.range),
      }
      return acc
    },
    {...params}
  )
)
export const addScaleToParams = params => (
  _.reduce(
    params,
    (acc, value, key) => {
      if (!_.includes(ACCESSORS_NAMES, key)) return acc
      if (value.scale) {
        acc[key] = value
        return acc
      }
      acc[key] = {
        ...value,
        scale: visUtils.getScale(key, value.type, value.domain, value.range, value.tickCount),
      }
      return acc
    },
    {...params}
  )
)
