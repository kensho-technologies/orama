
import _ from 'lodash'
import {ACCESSORS_NAMES, ACCESSORS_GROUPS} from './constants'

export const getDimArraysForLayer = (layer) => {
  const definedAccessors = _.pick(
    layer,
    layer.accessorsNames || ACCESSORS_NAMES
  )
  return _.reduce(
    definedAccessors,
    (acc, value, key) => _.assign(
      acc,
      {[`${key}Array`]: _.compact(_.map(layer.data, value))}
    ),
    {}
  )
}
export const getDimArraysForProps = props => {
  const rootDimArray = getDimArraysForLayer(props)
  const layersArrays = _.map(props.layers, getDimArraysForLayer)
  return _.merge(
    rootDimArray,
    ...layersArrays,
    (a, b) => a.concat(b)
  )
}
export const omitGroups = (dimArrays, accessorsGroups) => (
  _.flow(
    _.values,
    _.flatten,
    _.partialRight(_.map, d => `${d}Array`),
    _.partial(_.omit, dimArrays)
  )(accessorsGroups)
)
export const mergeDimArrays = (props, _dimArrays) => {
  const accessorsGroups = props.accessorsGroups || ACCESSORS_GROUPS
  const dimArrays = omitGroups(_dimArrays, accessorsGroups)
  return _.reduce(
    accessorsGroups,
    (acc, group, key) => {
      const array = _.reduce(
        group,
        (acc2, d) => _.compact(acc2.concat(_dimArrays[`${d}Array`])),
        []
      )
      if (array.length > 0) acc[`${key}Array`] = array
      return acc
    },
    dimArrays
  )
}
const addDimArrays = props => (
  _.flow(
    getDimArraysForProps,
    _.partial(mergeDimArrays, props),
    _.partial(_.merge, {}, props)
  )(props)
)
export default addDimArrays
