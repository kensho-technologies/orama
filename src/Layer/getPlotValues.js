// Copyright 2018 Kensho Technologies, LLC.

import {map, zipObject} from 'lodash'

import {ACCESSORS_NAMES, ACCESSORS_NAMES_NON_SCALABLE} from '../chartCore/defaults'

import plotValue from './plotValue'

export default function getPlotValues(props = {}, datum = {}, idx, defaults = {}) {
  const keys = ACCESSORS_NAMES.concat(ACCESSORS_NAMES_NON_SCALABLE)
  const values = map(keys, key => plotValue(props, datum, idx, key, defaults[key]))
  const result = zipObject(keys, values)
  result.data = datum
  return result
}
