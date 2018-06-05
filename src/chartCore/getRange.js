// Copyright 2018 Kensho Technologies, LLC.

import getMaxX from '../utils/rect/getMaxX'
import getMaxY from '../utils/rect/getMaxY'
import {TYPE} from '../defaults'

export default function getRange(props, key) {
  if (props[`${key}Range`]) return props[`${key}Range`]
  const {plotRect, [`${key}Type`]: type = TYPE} = props
  switch (key) {
    case 'y':
      return [getMaxY(plotRect), plotRect.y]
    case 'radius':
      return type === 'ordinal' ? [2, 4, 8, 12, 16, 20] : [2, 20]
    case 'lineWidth':
      return type === 'ordinal' ? [1, 2, 3, 4] : [0.5, 4]
    case 'lineDash':
      return [[2], [4], [8], [7, 4, 2, 4]]
    case 'fill':
    case 'stroke':
    case 'hoverStroke':
      return type === 'ordinal' ? props.theme.plotOrdinalRangeFill : props.theme.plotLinearRangeFill
    case 'x':
    default:
      return [plotRect.x, getMaxX(plotRect)]
  }
}
