
export const ACCESSORS_NAMES = [
  'x', 'x0', 'x1', 'x2',
  'y', 'y0', 'y1', 'y2',
  'r',
  'fill', 'stroke',
  'lineWidth',
]
export const ACCESSORS_GROUPS = {
  x: ['x', 'x0', 'x1', 'x2'],
  y: ['y', 'y0', 'y1', 'y2'],
}
export const JS_TO_VIS_TYPE = {
  'string': 'ordinal',
  'number': 'linear',
  'date': 'time',
}
export const BACKGROUND_OFFSET = 15
export const RANGE = [0, 1]
export const DOMAIN = [0, 1]
export const TYPE = 'linear'
export const TICK_COUNT = 1
export const RANGE_LINEAR_COLOR = ['#edf8b1', '#2c7fb8']
export const RANGE_ORDINAL_COLOR = ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854', '#ffd92f', '#e5c494', '#b3b3b3']
export const TICK_X_SPACE = 100
export const TICK_Y_SPACE = 90
export const SHOW_TICKS = true
export const SHOW_LABELS = true
export const AXIS_OFFSET = theme => (
  theme.fontSize * (theme.lineHeight - 0.75)
)
