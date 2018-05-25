// Copyright 2018 Kensho Technologies, LLC.

import {areas} from './areas'
import {bars} from './bars'
import brushes from './brushes'
import guides from './guides'
import {lines} from './lines'
import points from './points'
import ranges from './ranges'
import {text} from './text'
import scatterplotLabels from './scatterplotLabels'

export {areas, bars, brushes, guides, lines, points, ranges, text}
export {plotValue} from './plotValue'
export {default as getPlotValues} from './getPlotValues'

export const Layer = () => null
export const Areas = () => null
Areas.plot = areas
export const Bars = () => null
Bars.plot = bars
export const Brushes = () => null
Brushes.plot = brushes
export const Guides = () => null
Guides.plot = guides
export const Lines = () => null
Lines.plot = lines
export const Points = () => null
Points.plot = points
export const Ranges = () => null
Ranges.plot = ranges
export const Text = () => null
Text.plot = text

export const ScatterplotLabels = () => null
ScatterplotLabels.plot = scatterplotLabels
