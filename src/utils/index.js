// Copyright 2018 Kensho Technologies, LLC.

import _ from 'lodash'

export {default as labeler} from './labeler'
export {default as stateHOC} from './stateHOC'
export * as canvasUtils from './canvasUtils'
export * as dataGeneration from './dataGeneration'
export * as imageRender from './imageRender'
export * as path2DUtils from './path2DUtils'
export * as rectUtils from './rectUtils'
export * as windowUtils from './windowUtils'

const checkNotPlotNumber = value => _.isNaN(value) || !_.isNumber(value)
export const notPlotNumber = value => {
  if (!_.isArray(value)) return checkNotPlotNumber(value)
  return _.some(value, checkNotPlotNumber)
}

const checkIsPlotNumber = value => !_.isNaN(value) && _.isNumber(value)
export const isPlotNumber = value => {
  if (!_.isArray(value)) return checkIsPlotNumber(value)
  return _.some(value, checkIsPlotNumber)
}

export const notDatum = value => _.isUndefined(value) || _.isNaN(value) || _.isNull(value)

export const isDatum = value => !notDatum(value)

// returns (start, end] as opposed to [].slice() returning [start, end)
const slice = (arr, start, end) => arr.slice(start + 1, end + 1)

export const splitBy = (arr, iteratee) => {
  const {sliceFrom, returnArray} = _.reduce(
    arr,
    ({sliceFrom, returnArray}, val, idx) => {
      if (iteratee(val, idx)) {
        return {sliceFrom: idx, returnArray: [...returnArray, slice(arr, sliceFrom, idx)]}
      }
      return {sliceFrom, returnArray}
    },
    {sliceFrom: 0, returnArray: []}
  )
  return [...returnArray, slice(arr, sliceFrom, arr.length)]
}
