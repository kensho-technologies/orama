// Copyright 2018 Kensho Technologies, LLC.

import {max, min, uniq} from 'lodash'

import {TYPE} from '../defaults'

export default function getDomain(props, key) {
  if (props[`${key}Domain`]) return props[`${key}Domain`]
  const {
    [`${key}Array`]: array,
    [`${key}Type`]: type = TYPE,
    [`${key}ZeroBased`]: zeroBased,
  } = props
  if (type === 'ordinal') return uniq(array)
  if (zeroBased) return [Math.min(min(array), 0), Math.max(max(array), 0)]
  return [min(array), max(array)]
}
