// Copyright 2018 Kensho Technologies, LLC.

import {keys, mapKeys} from 'lodash'

import getDimArraysForRoot from './getDimArraysForRoot'
import mergeDimArrays from './mergeDimArrays'

/*
Dimension arrays are lists with the values extracted from the data for a certain dimension, eg. xArray: [1, 2, 3, 4, 5]
According to the accessors (`{x, y, fill}`) defined on the props.layers the dimArrays are created and assigned to a new props object.
Dimension arrays are also grouped according to accessorsGroups
*/

// add 'Array' sufix to dimArrays, add groupedKeys props
export const wrapUpNewProps = dimArrays => ({
  ...mapKeys(dimArrays, (value, key) => `${key}Array`),
  groupedKeys: keys(dimArrays),
})

// used outside of the module on the Chart props transform flow
export default function getDimArrays(props) {
  if (props.groupedKeys) return {}
  return wrapUpNewProps(mergeDimArrays(getDimArraysForRoot(props), props.accessorsGroups))
}
