// Copyright 2018 Kensho Technologies, LLC.

import _ from 'lodash'

import {plotValue} from '../plotValue'
import {ACCESSORS_NAMES, ACCESSORS_NAMES_NON_SCALABLE} from '../../chartCore/defaults'

export const getPlotValues = (props = {}, datum = {}, idx, defaults = {}) => {
  const keys = ACCESSORS_NAMES.concat(ACCESSORS_NAMES_NON_SCALABLE)
  const values = _.map(keys, key => plotValue(props, datum, idx, key, defaults[key]))
  const result = _.zipObject(keys, values)
  result.data = datum
  return result
}
