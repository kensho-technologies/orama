// Copyright 2018 Kensho Technologies, LLC.

import {isNumber} from 'lodash'

import {TICK_X_SPACE, TICK_Y_SPACE} from '../defaults'

export default function getTickCount(props, key) {
  if (isNumber(props[`${key}TickCount`])) return props[`${key}TickCount`]
  const {[`${key}Range`]: range, [`${key}TickSpace`]: _tickSpace} = props
  if (key === 'y') {
    const xTickSpace = _tickSpace || TICK_Y_SPACE
    return Math.ceil((range[0] - range[1]) / xTickSpace)
  }
  if (key === 'x') {
    const yTickSpace = _tickSpace || TICK_X_SPACE
    return Math.ceil((range[1] - range[0]) / yTickSpace)
  }
  return 0
}
