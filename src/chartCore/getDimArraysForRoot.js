// Copyright 2018 Kensho Technologies, LLC.

import {flatten, head, isEmpty, map, mergeWith, reduce} from 'lodash'

import compactData from '../utils/compactData'

const isUndefinedAccessor = value => typeof value !== 'string' || value === ''

// check if data is array of arrays
function tidyFlatten(data) {
  return Array.isArray(head(data)) ? flatten(data) : data
}

// for a layer.data, extract the dim array using an accessor
export function extractDimArray(data, accessor) {
  return compactData(map(tidyFlatten(data), accessor))
}

// according to the local defined accessors, extract and compact the dimArrays
export function getDimArraysForLayer(layer) {
  if (layer.skipExtractArrays === true) return {}
  const {localAccessors} = layer
  return reduce(
    localAccessors,
    (acc, accessor, key) => {
      if (isUndefinedAccessor(accessor)) return acc
      const dimArray = extractDimArray(layer.data, accessor)
      if (isEmpty(dimArray)) return acc
      return {...acc, [key]: dimArray}
    },
    {}
  )
}

// get dimension array from each layer, and merge the arrays with the same key
export default function getDimArraysForRoot(props) {
  const layersArrays = map(props.layers, getDimArraysForLayer)
  return mergeWith({}, ...layersArrays, (a, b) => {
    if (a === undefined) return b
    if (b === undefined) return a
    return a.concat(b)
  })
}
