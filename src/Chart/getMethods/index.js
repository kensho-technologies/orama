
import _ from 'lodash'
import * as rectUtils from '../../utils/rectUtils'
import {getScale} from '../getScale'
import {
  DOMAIN,
  JS_TO_VIS_TYPE,
  TICK_COUNT,
  TICK_X_SPACE,
  TICK_Y_SPACE,
  TYPE,
} from '../defaults'

/*
get methods that are used on the addMethods module
addMethods add new properties to the props object, these new properties are generated using these getMethods.
*/

export {getScale} from '../getScale'

export function toType(input) {
  return ({}).toString.call(input).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

export const getType = (props, key) => {
  if (props[`${key}Type`]) return props[`${key}Type`]
  const {
    [`${key}Array`]: array,
  } = props
  if (!array) return undefined
  const counter = _.reduce(
    array,
    (acc, d) => {
      acc[toType(d)] ++
      return acc
    },
    {number: 0, string: 0, date: 0}
  )
  const counterPairs = _.pairs(counter)
  const maxName = _.max(counterPairs, '1')[0]
  return JS_TO_VIS_TYPE[maxName]
}
export const getDomain = (props, key) => {
  if (props[`${key}Domain`]) return props[`${key}Domain`]
  const {
    [`${key}Array`]: array,
    [`${key}Type`]: type = TYPE,
    [`${key}ZeroBased`]: zeroBased,
  } = props
  switch (type) {
  case 'ordinal':
    return _.uniq(array)
  default:
    if (zeroBased) {
      return [
        _.min([_.min(array), 0]),
        _.max([_.max(array), 0]),
      ]
    }
    return [_.min(array), _.max(array)]
  }
}
export const getRange = (props, key) => {
  if (props[`${key}Range`]) return props[`${key}Range`]
  const {
    plotRect,
    [`${key}Type`]: type = TYPE,
  } = props
  switch (key) {
  case 'y':
    return [rectUtils.getMaxY(plotRect), plotRect.y]
  case 'radius':
    switch (type) {
    case 'ordinal':
      return [2, 4, 8, 12, 16, 20]
    default:
      return [2, 20]
    }
    break
  case 'lineWidth':
    switch (type) {
    case 'ordinal':
      return [1, 2, 3, 4]
    default:
      return [0.5, 4]
    }
    break
  case 'fill':
  case 'stroke':
    switch (type) {
    case 'ordinal':
      return props.theme.plotOrdinalRangeFill
    default:
      return props.theme.plotLinearRangeFill
    }
    break
  case 'x':
  default:
    return [plotRect.x, rectUtils.getMaxX(plotRect)]
  }
}
export const getTickCount = (props, key) => {
  if (props[`${key}TickCount`]) return props[`${key}TickCount`]
  const {
    [`${key}Range`]: range,
    [`${key}TickSpace`]: _tickSpace,
  } = props
  switch (key) {
  case 'y':
    const xTickSpace = _tickSpace || TICK_Y_SPACE
    return Math.ceil((range[0] - range[1]) / xTickSpace)
  case 'x':
  default:
    const yTickSpace = _tickSpace || TICK_X_SPACE
    return Math.ceil((range[1] - range[0]) / yTickSpace)
  }
}
export const getTickFormat = (props, key) => {
  if (props[`${key}TickFormat`]) return props[`${key}TickFormat`]
  const {
    [`${key}Scale`]: scale = getScale(props, key),
    [`${key}TickCount`]: tickCount = TICK_COUNT,
  } = props
  return scale.tickFormat(tickCount)
}
export function getTicks(props, key) {
  if (props[`${key}Ticks`]) return props[`${key}Ticks`]
  const {
    [`${key}Type`]: type = TYPE,
    [`${key}Domain`]: domain = DOMAIN,
    [`${key}TickCount`]: tickCount = TICK_COUNT,
  } = props
  switch (type) {
  case 'ordinal':
    return _.map(
      domain,
      d => ({
        value: d,
        text: d,
      })
    )
  case 'linear':
  default:
    const scale = getScale(props, key)
    const tickFormat = getTickFormat({...props, scale}, key)
    const ticks = scale.ticks(tickCount)
    return _.map(
      ticks,
      d => ({
        value: d,
        text: tickFormat(d),
      })
    )
  }
}
