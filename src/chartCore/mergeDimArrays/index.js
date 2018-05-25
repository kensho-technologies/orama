// Copyright 2018 Kensho Technologies, LLC.

import {flatten, flow, omit, reduce, values} from 'lodash'

import {ACCESSORS_GROUPS} from '../defaults'
import compactData from '../compactData'

export const omitGroups = (dimArrays, accessorsGroups) =>
  flow(values, flatten, accessorsValues => omit(dimArrays, accessorsValues))(accessorsGroups)
/*
Merge keys according to their groups, eg. 'x', 'x0', 'x1' get merged into one xArray
*/
export const mergeDimArrays = (dimArrays, accessorsGroups = ACCESSORS_GROUPS) =>
  reduce(
    accessorsGroups,
    (acc, group, key) => {
      const mergedDimArray = reduce(group, (acc2, d) => compactData(acc2.concat(dimArrays[d])), [])
      if (mergedDimArray.length === 0) return acc
      return {
        ...acc,
        [key]: mergedDimArray,
      }
    },
    omitGroups(dimArrays, accessorsGroups)
  )
