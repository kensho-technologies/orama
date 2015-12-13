
export const ACCESSORS_NAMES = [
  'x', 'x0', 'x1', 'x2',
  'y', 'y0', 'y1', 'y2',
  'radius',
  'fill', 'stroke',
  'lineWidth',
]
export const ACCESSORS_GROUPS = {
  x: ['x', 'x0', 'x1', 'x2'],
  y: ['y', 'y0', 'y1', 'y2'],
}
export const ACCESSORS_TOOLTIP_ORDER = {
  y: 1,
  y0: 2,
  y1: 3,
  y2: 4,
  x: 5,
  x0: 6,
  x1: 7,
  x2: 8,
  radius: 9,
  fill: 10,
  stroke: 11,
  lineWidth: 12,
}
export const JS_TO_VIS_TYPE = {
  'string': 'ordinal',
  'number': 'linear',
  'date': 'time',
}
export const SIZE = {width: 500, height: 500}
export const BACKGROUND_OFFSET = 15
export const RANGE = [0, 1]
export const DOMAIN = [0, 1]
export const TYPE = 'linear'
export const NICE = false
export const TICK_COUNT = 1
export const TICK_X_SPACE = 100
export const TICK_Y_SPACE = 90
export const SHOW_TICKS = true
export const SHOW_LABELS = true
export const AXIS_LABEL_OFFSET = theme => (
  theme.axisLabelFontSize * (theme.lineHeight - 0.75)
)
export const AXIS_TICK_OFFSET = theme => (
  theme.axisTickFontSize * (theme.lineHeight - 0.75)
)
export const PLOT_RECT = {
  x: 10, y: 10, width: 480, height: 480,
}
export const MARGIN_RIGHT = 15
