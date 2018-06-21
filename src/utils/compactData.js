// Copyright 2018 Kensho Technologies, LLC.

import {filter} from 'lodash'

import isDatum from './isDatum'

// same as _.compact, but keep the zeros, they are important for dataVis
export default function compactData(array) {
  return filter(array, isDatum)
}
