
import _ from 'lodash'
import {ACCESSORS_NAMES, ACCESSORS_GROUPS} from '../defaults'

/*
Dimension arrays are lists with the values extracted from the data for a certain dimension, eg. xArray: [1, 2, 3, 4, 5]
According to the accessors (`{x, y, fill}`) defined on the props and on the props.layers the dimArrays are created and assigned to a new props object.
Dimension arrays are also grouped according to accessorsGroups

@calling logic
addDimArrays{
  flow(
    getDimArraysForProps{
      getDimArraysForLayer{
        localCompact()
      }
    },
    mergeDimArrays{
      omitGroups()
      localCompact()
    },
    assignDimArraysToProps()
  )
}

@example
addDimArrays({
  data: [{p1: 1}],
  x: 'p1'
})
returns {
  ...props,
  xArray: [1],
  groupedKeys: ['x']
}

addDimArrays({
  layers: [{
    data: [{p1: 1}],
    x0: 'p1'
  }],
})
returns {
  ...props,
  xArray: [1],
  groupedKeys: ['x']
}
*/

const checkUndefinedAccessor = value => (
  !_.isString(value) || value === ''
)
const checkUndefinedValue = value => (
  _.isUndefined(value) || _.isNaN(value)
)
const localCompact = array => (
  _.reduce(
    array,
    (acc, d) => {
      if (checkUndefinedValue(d)) return acc
      acc.push(d)
      return acc
    },
    []
  )
)
const localFlatten = data => {
  if (_.isArray(_.first(data))) return _.flatten(data)
  return data
}
const addLocalDimensionsToLayer = layer => {
  const localKeys = _.flow(
    accessorsNames => _.pick(layer, accessorsNames),
    _.keys,
  )(layer.accessorsNames || ACCESSORS_NAMES)
  return {
    ...layer,
    localKeys,
  }
}
const addLocalDimensionsToProps = props => {
  if (props.layers) {
    const layers = _.map(props.layers, addLocalDimensionsToLayer)
    return {
      ...addLocalDimensionsToLayer(props),
      layers,
    }
  }
  return addLocalDimensionsToLayer(props)
}
export const getDimArraysForLayer = (layer) => {
  const definedAccessors = _.pick(
    layer,
    layer.accessorsNames || ACCESSORS_NAMES
  )
  return _.reduce(
    definedAccessors,
    (acc, value, key) => {
      if (checkUndefinedAccessor(value)) return acc
      const newArray = _.flow(
        localFlatten,
        data => _.pluck(data, value),
        localCompact,
      )(layer.data)
      if (_.isEmpty(newArray)) return acc
      return _.assign(
        acc,
        {[key]: newArray},
      )
    },
    {}
  )
}
/*
Get dimension array from the props root and from each layer, and merge the arrays with the same key.
*/
export const getDimArraysForProps = props => {
  const rootDimArray = getDimArraysForLayer(props)
  const layersArrays = _.map(props.layers, getDimArraysForLayer)
  const dimArrays = _.merge(
    rootDimArray,
    ...layersArrays,
    (a, b) => {
      if (_.isUndefined(a)) return b
      if (_.isUndefined(b)) return a
      return a.concat(b)
    }
  )
  return {
    props,
    dimArrays,
  }
}
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
export const mergeDimArrays = (props, _dimArrays) => {
  const accessorsGroups = props.accessorsGroups || ACCESSORS_GROUPS
  const dimArrays = _.reduce(
    accessorsGroups,
    (acc, group, key) => {
      const array = _.reduce(
        group,
        (acc2, d) => localCompact(acc2.concat(_dimArrays[d])),
        []
      )
      if (array.length > 0) acc[key] = array
      return acc
    },
    omitGroups(_dimArrays, accessorsGroups)
  )
  return {
    props,
    dimArrays,
  }
}
/*
Assign the the groupedKeys arrays back to props
*/
const assignDimArraysToProps = (props, dimArrays) => (
  _.assign(
    {},
    props,
    _.mapKeys(dimArrays, (value, key) => `${key}Array`),
    {groupedKeys: _.keys(dimArrays)}
  )
)
/*
Main exported function, used outside of the module on the Chart props transform flow.
*/
export const addDimArrays = _props => (
  _.flow(
    addLocalDimensionsToProps,
    getDimArraysForProps,
    ({props, dimArrays}) => mergeDimArrays(props, dimArrays),
    ({props, dimArrays}) => assignDimArraysToProps(props, dimArrays),
  )(_props)
)
