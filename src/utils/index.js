// Copyright 2017 Kensho Technologies, Inc.

import _ from 'lodash'

exports.labeler = require('./labeler')
exports.canvasUtils = require('./canvasUtils')
exports.dataGeneration = require('./dataGeneration')
exports.imageRender = require('./imageRender')
exports.path2DUtils = require('./path2DUtils')
exports.rectUtils = require('./rectUtils')
exports.windowUtils = require('./windowUtils')
exports.stateHOC = require('./stateHOC')

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
