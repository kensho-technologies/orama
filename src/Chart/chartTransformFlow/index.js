
import _ from 'lodash'

/*
Start with the input props, send then to the first transform, merge the returned new props back to the props. Do again with the next transform.

const rootProps = chartTransformFlow(
  props,
  t1,
  t2,
  t3
)
*/

export const removeDimArrays = props => {
  const names = _.map(props.groupedKeys, key => `${key}Array`)
  return _.omit(props, names)
}

const transformFlow = arg =>
  _.reduce(
    _.slice(arg, 1),
    (acc, d) => ({
      ...acc,
      ...d(acc),
    }),
    arg[0]
  )

export const chartTransformFlow = (...arg) =>
  removeDimArrays(transformFlow(arg))
