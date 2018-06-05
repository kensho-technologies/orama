// Copyright 2018 Kensho Technologies, LLC.

import {TICK_COUNT, TYPE} from '../defaults'

import getScale from './getScale'

export default function getTooltipFormat(props, key) {
  if (props[`${key}TooltipFormat`]) return props[`${key}TooltipFormat`]
  const {
    [`${key}Type`]: type = TYPE,
    [`${key}Scale`]: scale = getScale(props, key),
    [`${key}TickCount`]: tickCount = TICK_COUNT,
  } = props
  if (type === 'log') {
    const linearScale = getScale({...props, [`${key}Type`]: 'linear'}, key)
    return linearScale.tickFormat(tickCount)
  }
  if (type === 'time') return d => d.toDateString()
  if (!scale.tickFormat) return d => d
  return scale.tickFormat(tickCount)
}
