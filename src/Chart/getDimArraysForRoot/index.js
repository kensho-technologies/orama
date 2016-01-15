
import _ from 'lodash'

import {compactData} from '../../Chart/compactData'

const checkUndefinedAccessor = value => (
  !_.isString(value) || value === ''
)
/*
quick check if data is array of arrays
*/
const tidyFlatten = data => {
  if (_.isArray(_.first(data))) return _.flatten(data)
  return data
}
/*
for a layer.data, extract the dim array using an accessor
*/
const extractDimArray = (data, accessor) =>
  _.flow(
    tidyFlatten,
    _data => _.map(_data, accessor),
    compactData,
  )(data)
/*
according to the local defined accessors, extract and compact the dimArrays
*/
export const getDimArraysForLayer = layer => {
  if (layer.skipExtractArrays === true) return {}
  const {localDefinedAccessors} = layer
  return _.reduce(
    localDefinedAccessors,
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
export const getDimArraysForRoot = props => {
  const layersArrays = _.map(props.layers, getDimArraysForLayer)
  const dimArrays = _.merge(
    {},
    ...layersArrays,
    (a, b) => {
      if (_.isUndefined(a)) return b
      if (_.isUndefined(b)) return a
      return a.concat(b)
    }
  )
  return dimArrays
}
