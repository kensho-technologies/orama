// Copyright 2018 Kensho Technologies, LLC.

import _ from 'lodash'
import {ACCESSORS_GROUPS} from '../../chartCore/defaults'

import {compactData} from '../../chartCore/compactData'

export const omitGroups = (dimArrays, accessorsGroups) => (
  _.flow(
    _.values,
    _.flatten,
    accessorsValues => _.omit(dimArrays, accessorsValues),
  )(accessorsGroups)
)
/*
Merge keys according to their groups, eg. 'x', 'x0', 'x1' get merged into one xArray
*/
export const mergeDimArrays = (dimArrays, accessorsGroups = ACCESSORS_GROUPS) =>
  _.reduce(
    accessorsGroups,
    (acc, group, key) => {
      const mergedDimArray = _.reduce(
        group,
        (acc2, d) => compactData(acc2.concat(dimArrays[d])),
        []
      )
      if (mergedDimArray.length === 0) return acc
      return {
        ...acc,
        [key]: mergedDimArray,
      }
    },
    omitGroups(dimArrays, accessorsGroups)
  )
