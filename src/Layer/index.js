
import {areas} from '../Layer/areas'
import {bars} from '../Layer/bars'
import {brushes} from '../Layer/brushes'
import {guides} from '../Layer/guides'
import {lines} from '../Layer/lines'
import {points} from '../Layer/points'
import {ranges} from '../Layer/ranges'
import {text} from '../Layer/text'
import {scatterplotLabels} from '../Layer/scatterplotLabels'

export {areas} from '../Layer/areas'
export {bars} from '../Layer/bars'
export {brushes} from '../Layer/brushes'
export {guides} from '../Layer/guides'
export {lines} from '../Layer/lines'
export {points} from '../Layer/points'
export {ranges} from '../Layer/ranges'
export {text} from '../Layer/text'

export {plotValue} from '../Layer/plotValue'
export {getPlotValues} from '../Layer/getPlotValues'

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
