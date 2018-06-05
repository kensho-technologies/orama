// Copyright 2018 Kensho Technologies, LLC.

import {countBy, maxBy} from 'lodash'

import {JS_TO_VIS_TYPE} from '../defaults'

export function toType(value) {
  if (value instanceof Date) return 'date'
  if (Array.isArray(value)) return 'array'
  return typeof value
}

export default function getType(props, key) {
  if (props[`${key}Type`]) return props[`${key}Type`]
  const {[`${key}Array`]: array} = props
  if (!array) return undefined
  const counter = countBy(array, toType)
  const maxName = maxBy(Object.keys(counter), d => counter[d])
  return JS_TO_VIS_TYPE[maxName]
}
