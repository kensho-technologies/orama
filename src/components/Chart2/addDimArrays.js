
import _ from 'lodash'
import {ACCESSORS_NAMES, ACCESSORS_GROUPS} from './constants'

/*
Dimension arrays are lists with the values extracted from the data for a certain dimension, eg. xArray: [1, 2, 3, 4, 5]
According to the accessors (`{x, y, color}`) defined on the props and on the props.layers the dimArrays are created and assigned to a new props object.
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
  dimensions: ['x']
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
  dimensions: ['x']
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
export const getDimArraysForLayer = (layer) => {
  const definedAccessors = _.pick(
    layer,
    layer.accessorsNames || ACCESSORS_NAMES
  )
  return _.reduce(
    definedAccessors,
    (acc, value, key) => {
      if (checkUndefinedAccessor(value)) return acc
      const newArray = localCompact(_.map(layer.data, value))
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
  return _.merge(
    rootDimArray,
    ...layersArrays,
    (a, b) => {
      if (_.isUndefined(a)) return b
      if (_.isUndefined(b)) return a
      return a.concat(b)
    }
  )
}
export const omitGroups = (dimArrays, accessorsGroups) => (
  _.flow(
    _.values,
    _.flatten,
    _.partial(_.omit, dimArrays)
  )(accessorsGroups)
)
/*
Merge keys according to their groups, eg. 'x', 'x0', 'x1' get merged into one xArray
*/
export const mergeDimArrays = (props, _dimArrays) => {
  const accessorsGroups = props.accessorsGroups || ACCESSORS_GROUPS
  const dimArrays = omitGroups(_dimArrays, accessorsGroups)
  return _.reduce(
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
    dimArrays
  )
}
/*
Assign the the dimensions arrays back to props
*/
const assignDimArraysToProps = (props, dimArrays) => (
  _.assign(
    {},
    props,
    _.mapKeys(dimArrays, (value, key) => `${key}Array`),
    {dimensions: _.keys(dimArrays)}
  )
)
/*
Main exported function, used outside of the module on the Chart props transform flow.
*/
export const addDimArrays = props => (
  _.flow(
    getDimArraysForProps,
    _.partial(mergeDimArrays, props),
    _.partial(assignDimArraysToProps, props)
  )(props)
)
