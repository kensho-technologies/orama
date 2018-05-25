// Copyright 2018 Kensho Technologies, LLC.

import {map, omit, reduce, slice} from 'lodash'

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

export function removeDimArrays(props) {
  const names = map(props.groupedKeys, key => `${key}Array`)
  return omit(props, names)
}

const transformFlow = arg =>
  reduce(slice(arg, 1), (acc, d) => ({...acc, ...d(acc)}), omit(arg[0], PROPS_TO_OMIT))

export const chartTransformFlow = (...arg) => removeDimArrays(transformFlow(arg))
