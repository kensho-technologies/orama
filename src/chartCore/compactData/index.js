// Copyright 2018 Kensho Technologies, LLC.

import {filter} from 'lodash'

import {notDatum} from '../../utils'

// same as _.compact, but keep the zeros, they are important for dataVis
export default function compactData(array) {
  return filter(array, d => !notDatum(d))
}
