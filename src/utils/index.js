
import _ from 'lodash'

export * as canvasUtils from './canvasUtils'
export * as dataGeneration from './dataGeneration'
export * as imageRender from './imageRender'
export labeler from './labeler'
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

export const notDatum = value => (
  _.isUndefined(value) || _.isNaN(value) || _.isNull(value)
)

export const isDatum = value => !notDatum(value)
