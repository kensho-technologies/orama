
import _ from 'lodash'
import * as visUtils from '../../utils/visUtils'

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
  return _.max(counterPairs, '1')[0]
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
This method check each param from the 'params' object and see if param[propName] is defined
If it's not it does param[propName] = method(param.data)
*/
export const runMethodOnParams = _.curry((propName, method, params) => (
  _.reduce(
    params,
    (acc, value, key) => {
      if (value[propName]) {
        acc[key] = value
        return acc
      }
      acc[key] = {
        ...value,
        [propName]: method(value.data),
      }
      return acc
    },
    {}
  )
))
/*
add types for each one of the params, if the type is missing

addTypesToParams({ x: { data: [1, 2, 3] } })
return { x: { data: [ 1, 2, 3 ], type: 'number' } }
*/
export const addTypesToParams = runMethodOnParams('type', getTypeFromArray)

// export const getParams = dataValues => {
//
// }
