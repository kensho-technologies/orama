// Copyright 2018 Kensho Technologies, LLC.

import {map, omit, reduce} from 'lodash'

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

function removeDimArrays(props) {
  const names = map(props.groupedKeys, key => `${key}Array`)
  return omit(props, names)
}

function transformFlow([first, ...rest]) {
  return reduce(rest, (acc, d) => ({...acc, ...d(acc)}), omit(first, PROPS_TO_OMIT))
}

export default function chartTransformFlow(...args) {
  return removeDimArrays(transformFlow(args))
}
