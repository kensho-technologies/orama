
import _ from 'lodash'
import {
  getType,
  getDomain,
  getRange,
  getTickCount,
  getScale,
  getTickFormat,
} from '../../Chart/getForKey'

/*
Functions to be used on the Chart props transformation flow.
The transformation flow starts with the <Chart/> props and successively adds the variables needed for plotting, the transformed props are used for generating render data.
*/

export {getDimArrays} from '../../Chart/getDimArrays'
export {getPlotRect} from '../../Chart/getPlotRect'

export const getForProps = (value, getFunc) => props =>
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

export const getTypes = getForProps('Type', getType)
export const getDomains = getForProps('Domain', getDomain)
export const getRanges = getForProps('Range', getRange)
export const getTickCounts = getForProps('TickCount', getTickCount)
export const getScales = getForProps('Scale', getScale)
export const getTickFormatters = getForProps('TickFormat', getTickFormat)
