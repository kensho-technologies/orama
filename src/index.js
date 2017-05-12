// Copyright 2017 Kensho Technologies, Inc.

export {Chart} from './Chart'
export * from './Layer'
export * from './extensions'
export {DEFAULT_THEME} from './defaultTheme'
export * from './utils/dataGeneration'
export {getPath2D} from './utils/path2DUtils'
export {getCachedContext} from './utils/canvasUtils'

exports.utils = require('./utils')
exports.chartCore = require('./chartCore')
