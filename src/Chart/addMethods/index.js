
import _ from 'lodash'
import {
  getType,
  getDomain,
  getRange,
  getTickCount,
  getScale,
  getTickFormat,
} from '../getMethods'

/*
Functions to be used on the Chart props transformation flow.
The transformation flow starts with the <Chart/> props and successively adds the variables needed for plotting, the transformed props are used for generating render data.
*/

export {addDimArrays} from '../addDimArrays'
export {addPlotRect} from '../addPlotRect'

export const addToProps = (value, getFunc) => props =>
  _.reduce(
    props.groupedKeys,
    (acc, key) => {
      if (props[`${key}${value}`]) return acc
      return {
        ...acc,
        [`${key}${value}`]: getFunc(props, key),
      }
    },
    {}
  )

export const addTypes = addToProps('Type', getType)
export const addDomains = addToProps('Domain', getDomain)
export const addRanges = addToProps('Range', getRange)
export const addTickCounts = addToProps('TickCount', getTickCount)
export const addScales = addToProps('Scale', getScale)
export const addTickFormatters = addToProps('TickFormat', getTickFormat)
