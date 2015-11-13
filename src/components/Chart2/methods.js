
import _ from 'lodash'
import * as visUtils from '../../utils/visUtils'

/*
This module contains some of the props flow that generate the configurations for the plot functions.
*/

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
export const addTypes = props => {
  const types = _.reduce(
    props.dimensions,
    (acc, value) => {
      if (props[`${value}Type`]) return acc
      return _.set(
        acc,
        `${value}Type`,
        getTypeFromArray(props[`${value}Array`])
      )
    },
    {}
  )
  return _.assign({}, props, types)
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
export const addDomains = props => {
  const domains = _.reduce(
    props.dimensions,
    (acc, value) => {
      if (props[`${value}Domain`]) return acc
      return _.set(
        acc,
        `${value}Domain`,
        getDomainFromArray(props[`${value}Array`], props[`${value}Type`])
      )
    },
    {}
  )
  return _.assign({}, props, domains)
}
export const addRanges = props => {
  const ranges = _.reduce(
    props.dimensions,
    (acc, value) => {
      if (props[`${value}Range`]) return acc
      return _.set(
        acc,
        `${value}Range`,
        visUtils.getRange(value, props.plotRect, props[`${value}Type`])
      )
    },
    {}
  )
  return _.assign({}, props, ranges)
}
export const addTickCounts = props => {
  const tickCounts = _.reduce(
    props.dimensions,
    (acc, value) => {
      if (props[`${value}TickCount`]) return acc
      return _.set(
        acc,
        `${value}TickCount`,
        visUtils.getTickCount(value, props[`${value}Range`])
      )
    },
    {}
  )
  return _.assign({}, props, tickCounts)
}
export const addScales = props => {
  const scales = _.reduce(
    props.dimensions,
    (acc, value) => {
      if (props[`${value}Scale`]) return acc
      return _.set(
        acc,
        `${value}Scale`,
        visUtils.getScale(
          value,
          props[`${value}Type`],
          props[`${value}Domain`],
          props[`${value}Range`]
        )
      )
    },
    {}
  )
  return _.assign({}, props, scales)
}
