// Copyright 2018 Kensho Technologies, LLC.

import _ from 'lodash'
import {notDatum} from '../../utils'

/*
same as _.compact, but keep the zeros, they are important for dataVis
*/
export const compactData = array => (
  _.reduce(
    array,
    (acc, d) => {
      if (notDatum(d)) return acc
      acc.push(d)
      return acc
    },
    []
  )
)
