// Copyright 2018 Kensho Technologies, LLC.

import {findIndex, get, last, map} from 'lodash'
import {scaleLinear, scaleLog, scaleOrdinal, scalePoint, scaleUtc} from 'd3-scale'

import {DOMAIN, NICE, RANGE, TICK_COUNT, TYPE} from '../defaults'

// `getScale` returns the scale for a key according to configurations on props object
// e.g. getScale({xType, xDomain, xRange, xTickCount}, 'x') => {...props, xScale}

function createScale(factory, domain, range) {
  return factory()
    .domain(domain)
    .range(range)
}

// get a scale with logic for the x and y axis, if the domain starts and finishes on the same
// number returns the mid range value
function getBaseScales(type, domain, range, nice, tickCount) {
  const factory = (type === 'time' && scaleUtc) || (type === 'log' && scaleLog) || scaleLinear
  const scale = createScale(factory, domain, range)
  if (nice) scale.nice(tickCount)
  return scale
}

export function getOrdinalInvert(scale) {
  const mapArray = map(scale.domain(), raw => ({raw, mapped: scale(raw)}))
  return input => {
    const hoverIndex = findIndex(mapArray, d => get(d, 'mapped') > input)
    if (hoverIndex === 0) {
      const hoverData = mapArray[hoverIndex]
      return hoverData.raw
    }
    if (hoverIndex === -1) {
      const hoverData = last(mapArray)
      return hoverData.raw
    }
    const px = get(mapArray[hoverIndex], 'mapped')
    const x = get(mapArray[hoverIndex - 1], 'mapped')
    if (input - px < x - input) {
      const hoverData = mapArray[hoverIndex - 1]
      return hoverData.raw
    }
    const hoverData = mapArray[hoverIndex]
    return hoverData.raw
  }
}

export function getAxisScale(props, key) {
  const {
    [`${key}Type`]: type = TYPE,
    [`${key}Domain`]: domain = DOMAIN,
    [`${key}Range`]: range = RANGE,
    [`${key}TickCount`]: tickCount = TICK_COUNT,
    [`${key}Nice`]: nice = NICE,
  } = props
  if (type === 'ordinal') {
    const ordinalScale = createScale(scalePoint, domain, range).padding(0.5)
    ordinalScale.invert = getOrdinalInvert(ordinalScale)
    return ordinalScale
  }
  if (domain[0] === domain[1]) {
    const midRange = range[0] + (range[1] - range[0]) / 2
    const linearScaleFlatDomain = () => midRange
    linearScaleFlatDomain.tickFormat = () => d => d
    linearScaleFlatDomain.ticks = () => [domain[0]]
    return linearScaleFlatDomain
  }
  return getBaseScales(type, domain, range, nice, tickCount)
}

export function getDefaultScale(props, key) {
  const {
    [`${key}Type`]: type = TYPE,
    [`${key}Domain`]: domain = DOMAIN,
    [`${key}Range`]: range = RANGE,
    [`${key}TickCount`]: tickCount = TICK_COUNT,
    [`${key}Nice`]: nice = NICE,
  } = props
  return type === 'ordinal'
    ? createScale(scaleOrdinal, domain, range)
    : getBaseScales(type, domain, range, nice, tickCount)
}

// main exported function, used outside of the module on the Chart props transform flow
export default function getScale(props, key) {
  return key === 'x' || key === 'y' ? getAxisScale(props, key) : getDefaultScale(props, key)
}
