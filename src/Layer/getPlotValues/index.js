
import _ from 'lodash'

import {plotValue} from '../../Layer/plotValue'
import {ACCESSORS_NAMES} from '../../chartCore/defaults'
import {ACCESSORS_NAMES_NON_SCALABLE} from '../../chartCore/defaults'

export const getPlotValues = (props = {}, datum = {}, defaults = {}) => {
  const keys = ACCESSORS_NAMES.concat(ACCESSORS_NAMES_NON_SCALABLE)
  const values = _.map(keys, key => plotValue(props, datum, key, defaults[key]))
  const result = _.zipObject(keys, values)
  result.data = datum
  return result
}
