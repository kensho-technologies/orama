// Copyright 2018 Kensho Technologies, LLC.

import {map} from 'lodash'

import {DOMAIN, TICK_COUNT, TYPE} from '../defaults'

import getScale from './getScale'
import getTickFormat from './getTickFormat'

export default function getTicks(props, key) {
  if (props[`${key}Ticks`]) return props[`${key}Ticks`]
  const {
    [`${key}Type`]: type = TYPE,
    [`${key}Domain`]: domain = DOMAIN,
    [`${key}TickCount`]: tickCount = TICK_COUNT,
    [`${key}Scale`]: scale = getScale(props, key),
  } = props
  if (type === 'ordinal') return map(domain, d => ({value: d, text: d}))
  const tickFormat = getTickFormat({...props, scale}, key)
  const ticks = scale.ticks(tickCount)
  return map(ticks, d => ({value: d, text: tickFormat(d)}))
}
