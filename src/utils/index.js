// Copyright 2018 Kensho Technologies, LLC.

import {isNaN, isNumber, isNull, isUndefined, reduce, some} from 'lodash'

export {default as labeler} from './labeler'
export {default as stateHOC} from './stateHOC'
export * as canvasUtils from './canvasUtils'
export * as dataGeneration from './dataGeneration'
export * as imageRender from './imageRender'
export * as path2DUtils from './path2DUtils'
export * as rectUtils from './rectUtils'
export * as windowUtils from './windowUtils'

const checkNotPlotNumber = value => isNaN(value) || !isNumber(value)
export function notPlotNumber(value) {
  if (!Array.isArray(value)) return checkNotPlotNumber(value)
  return some(value, checkNotPlotNumber)
}

const checkIsPlotNumber = value => !isNaN(value) && isNumber(value)
export function isPlotNumber(value) {
  if (!Array.isArray(value)) return checkIsPlotNumber(value)
  return some(value, checkIsPlotNumber)
}

export const notDatum = value => isUndefined(value) || isNaN(value) || isNull(value)

export const isDatum = value => !notDatum(value)

// returns (start, end] as opposed to [].slice() returning [start, end)
const slice = (arr, start, end) => arr.slice(start + 1, end + 1)

export function splitBy(arr, iteratee) {
  const {sliceFrom, returnArray} = reduce(
    arr,
    (acc, val, idx) => {
      if (iteratee(val, idx)) {
        return {sliceFrom: idx, returnArray: [...acc.returnArray, slice(arr, acc.sliceFrom, idx)]}
      }
      return acc
    },
    {sliceFrom: 0, returnArray: []}
  )
  return [...returnArray, slice(arr, sliceFrom, arr.length)]
}
