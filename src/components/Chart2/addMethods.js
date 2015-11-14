
import _ from 'lodash'
import {
  getType,
  getDomain,
  getRange,
  getTickCount,
  getScale,
} from './getMethods'

export {addDimArrays} from './addDimArrays'
export {addPlotRect} from './addPlotRect'

export const addToProps = (value, getFunc) => props => {
  const newProps = _.reduce(
    props.dimensions,
    (acc, key) => {
      if (props[`${key}${value}`]) return acc
      return _.set(
        acc,
        `${key}${value}`,
        getFunc(props, key)
      )
    },
    {}
  )
  return _.assign({}, props, newProps)
}

export const addTypes = addToProps('Type', getType)
export const addDomains = addToProps('Domain', getDomain)
export const addRanges = addToProps('Range', getRange)
export const addTickCounts = addToProps('TickCount', getTickCount)
export const addScales = addToProps('Scale', getScale)
