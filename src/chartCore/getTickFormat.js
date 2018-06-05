// Copyright 2018 Kensho Technologies, LLC.

import {TICK_COUNT} from '../defaults'

import getScale from './getScale'

export default function getTickFormat(props, key) {
  if (props[`${key}TickFormat`]) return props[`${key}TickFormat`]
  const {
    [`${key}Type`]: type,
    [`${key}Scale`]: scale = getScale(props, key),
    [`${key}TickCount`]: tickCount = TICK_COUNT,
  } = props
  if (type === 'time') return scale.tickFormat()
  return scale.tickFormat(tickCount)
}
