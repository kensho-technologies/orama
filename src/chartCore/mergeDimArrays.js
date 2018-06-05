// Copyright 2018 Kensho Technologies, LLC.

import {flatten, omit, reduce, values} from 'lodash'

import {ACCESSORS_GROUPS} from '../defaults'

import compactData from './compactData'

export function omitGroups(dimArrays, accessorsGroups) {
  return omit(dimArrays, flatten(values(accessorsGroups)))
}

// merge keys according to their groups, e.g. 'x', 'x0', 'x1' get merged into one xArray
export default function mergeDimArrays(dimArrays, accessorsGroups = ACCESSORS_GROUPS) {
  return reduce(
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
}
