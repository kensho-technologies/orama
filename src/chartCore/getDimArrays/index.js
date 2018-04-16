// Copyright 2017 Kensho Technologies, LLC.

import _ from 'lodash'

import {getDimArraysForRoot} from '../../chartCore/getDimArraysForRoot'
import {mergeDimArrays} from '../../chartCore/mergeDimArrays'

/*
Dimension arrays are lists with the values extracted from the data for a certain dimension, eg. xArray: [1, 2, 3, 4, 5]
According to the accessors (`{x, y, fill}`) defined on the props.layers the dimArrays are created and assigned to a new props object.
Dimension arrays are also grouped according to accessorsGroups
*/

/*
Add 'Array' sufix to dimArrays, add groupedKeys props
*/
export const wrapUpNewProps = dimArrays => ({
  ..._.mapKeys(dimArrays, (value, key) => `${key}Array`),
  groupedKeys: _.keys(dimArrays),
})
/*
Main exported function, used outside of the module on the Chart props transform flow.
*/
export const getDimArrays = props => {
  if (props.groupedKeys) return {}
  const getArraysFlow = _.flow(
    getDimArraysForRoot,
    dimArrays => mergeDimArrays(dimArrays, props.accessorsGroups),
    wrapUpNewProps,
  )
  return getArraysFlow(props)
}
