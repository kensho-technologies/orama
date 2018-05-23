// Copyright 2018 Kensho Technologies, LLC.

import _ from 'lodash'

import {compactData} from '../compactData'

const checkUndefinedAccessor = value => !_.isString(value) || value === ''
/*
quick check if data is array of arrays
*/
function tidyFlatten(data) {
  if (_.isArray(_.head(data))) return _.flatten(data)
  return data
}
/*
for a layer.data, extract the dim array using an accessor
*/
export const extractDimArray = (data, accessor) =>
  _.flow(tidyFlatten, _data => _.map(_data, accessor), compactData)(data)
/*
according to the local defined accessors, extract and compact the dimArrays
*/
export function getDimArraysForLayer(layer) {
  if (layer.skipExtractArrays === true) return {}
  const {localAccessors} = layer
  return _.reduce(
    localAccessors,
    (acc, accessor, key) => {
      if (checkUndefinedAccessor(accessor)) return acc
      const dimArray = extractDimArray(layer.data, accessor)
      if (_.isEmpty(dimArray)) return acc
      return {
        ...acc,
        [key]: dimArray,
      }
    },
    {}
  )
}
/*
Get dimension array from each layer, and merge the arrays with the same key.
*/
export function getDimArraysForRoot(props) {
  const layersArrays = _.map(props.layers, getDimArraysForLayer)
  const dimArrays = _.mergeWith({}, ...layersArrays, (a, b) => {
    if (_.isUndefined(a)) return b
    if (_.isUndefined(b)) return a
    return a.concat(b)
  })
  return dimArrays
}
