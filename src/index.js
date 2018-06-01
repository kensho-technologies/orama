// Copyright 2018 Kensho Technologies, LLC.

export {default as DEFAULT_THEME} from './defaultTheme'
export {getPath2D} from './utils/path2DUtils'
export {getCachedContext} from './utils/canvasUtils'
export * as utils from './utils'
export * as chartCore from './chartCore'

export {default as areas} from './Layer/areas'
export {default as bars} from './Layer/bars'
export {default as brushes} from './Layer/brushes'
export {default as guides} from './Layer/guides'
export {default as lines} from './Layer/lines'
export {default as points} from './Layer/points'
export {default as ranges} from './Layer/ranges'
export {default as text} from './Layer/text'
export {default as plotValue} from './Layer/plotValue'
export {default as getPlotValues} from './Layer/getPlotValues'

export {default as Chart} from './Chart'
export {
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
export {default as Brush} from './extensions/Brush'
export {default as Highlight} from './extensions/Highlight'
