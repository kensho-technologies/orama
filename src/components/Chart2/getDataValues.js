
import _ from 'lodash'

export const ACCESSORS_NAMES = [
  'x', 'y', 'r', 'fill', 'stroke',
]
export const ACCESSORS_EXPANDED_NAMES = [
  'x', 'x0', 'y', 'y0', 'r', 'fill', 'stroke',
]
export const ACCESSORS_GROUPS = {
  x: ['x', 'x0'],
  y: ['y', 'y0'],
  r: ['r'],
  fill: ['fill'],
  stroke: ['stroke'],
}
/*
returns an object with the defined accessors names from a props object

getDefinedAccessors({x: 'x', y: 'y', xName: 'The Prop 1'})
return {x: 'x', y: 'y'}
*/
export const getDefinedAccessors = props => (
  _.pick(props, ACCESSORS_EXPANDED_NAMES)
)
/*
returns a data values object by extracting arrays from the data using the accessors

getDataValuesFromData([{x: 1}, {x: 2}], {x: 'x'})
return {x: [1, 2]}
*/
export const getDataValuesFromData = (
  data, definedAccessors, dataValues = {}
) => (
  _.reduce(
    definedAccessors,
    (acc, value, key) => ({
      ...acc,
      [key]: _.compact(_.flatten([acc[key], _.map(data, value)])),
    }),
    dataValues
  )
)
// extends the input dataValues with dataValues from each layer
export const getDataValuesFromLayers = (
  props, definedAccessors, dataValues = {}
) => (
  _.reduce(
    props.layers,
    (acc, layer) => {
      const layerAccessors = {
        ...definedAccessors,
        ...getDefinedAccessors(layer),
      }
      return getDataValuesFromData(
        layer.data || props.data,
        layerAccessors,
        acc
      )
    },
    dataValues
  )
)
export const getMergedAccessorGroup = (dataValues, accessors) => (
  _.reduce(
    accessors,
    (acc, accessor) => {
      const data = dataValues[accessor]
      if (!data) return acc
      return acc.concat(data)
    },
    []
  )
)
export const mergeDataValues = dataValues => (
  _.reduce(
    ACCESSORS_GROUPS,
    (acc, accessors, key) => {
      const merged = getMergedAccessorGroup(dataValues, accessors)
      if (merged.length > 0) acc[key] = merged
      return acc
    },
    {}
  )
)
/*
Return the dataValues from the default data and all layers.
The dataValues are used for getting the data type, domain, range, ...
dataValues = {
  x: [...],
  y: [...],
  ...
}
*/
export const getDataValues = props => {
  const definedAccessors = getDefinedAccessors(props)
  const dataValues = getDataValuesFromLayers(
    props,
    definedAccessors,
    getDataValuesFromData(props.data, definedAccessors)
  )
  return mergeDataValues(dataValues)
}
