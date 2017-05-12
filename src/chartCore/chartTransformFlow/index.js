// Copyright 2017 Kensho Technologies, Inc.

import _ from 'lodash'

const PROPS_TO_OMIT = ['memoizers', 'onUpdate', 'onState', 'layerProps', 'rootProps']

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
    _.omit(arg[0], PROPS_TO_OMIT)
  )

export const chartTransformFlow = (...arg) =>
  removeDimArrays(transformFlow(arg))
