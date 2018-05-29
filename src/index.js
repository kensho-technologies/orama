// Copyright 2018 Kensho Technologies, LLC.

export {default as Chart} from './Chart'
export {default as DEFAULT_THEME} from './defaultTheme'
export {getTimeSeries} from './utils/dataGeneration'
export {getPath2D} from './utils/path2DUtils'
export {getCachedContext} from './utils/canvasUtils'
export * as utils from './utils'
export * as chartCore from './chartCore'

export {default as Brush} from './extensions/Brush'
export {default as Highlight} from './extensions/Highlight'

export {
  areas,
  bars,
  brushes,
  guides,
  lines,
  points,
  ranges,
  text,
  plotValue,
  getPlotValues,
  Layer,
  Areas,
  Bars,
  Brushes,
  Guides,
  Lines,
  Points,
  Ranges,
  Text,
  ScatterplotLabels,
} from './Layer'
