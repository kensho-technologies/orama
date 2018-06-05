// Copyright 2018 Kensho Technologies, LLC.

import {map, flatten, isNumber} from 'lodash'

import {BACKGROUND_OFFSET} from '../defaults'
import getPath2D from '../utils/getPath2D'

import {
  bottomHorizontalLine,
  bottomCenterLine,
  centerArea,
  verticalArea,
  horizontalArea,
  leftVerticalLine,
  leftCenterLine,
  rightVerticalLine,
  rightCenterLine,
  topHorizontalLine,
  topCenterLine,
  rightBottomLine,
  leftBottomLine,
  leftTopLine,
  rightTopLine,
} from './getBrushesRenderData'
import getPlotValues from './getPlotValues'

function brushesRender(props, datum) {
  const {backgroundOffset = BACKGROUND_OFFSET, plotRect} = props
  const stroke = props.strokeValue
  const fill = props.fillValue
  const fillAlpha = props.fillAlphaValue || 0.4
  const lineWidth = props.lineWidthValue || 3
  const values = getPlotValues(props, datum)

  const renderArgs = {
    ...values,
    plotRect,
    backgroundOffset,
    stroke,
    fill,
    fillAlpha,
    lineWidth,
  }

  if (isNumber(values.x1) && isNumber(values.x2) && isNumber(values.y1) && isNumber(values.y2)) {
    return [
      centerArea(renderArgs),
      leftCenterLine(renderArgs),
      rightCenterLine(renderArgs),
      topCenterLine(renderArgs),
      bottomCenterLine(renderArgs),
      leftTopLine(renderArgs),
      leftBottomLine(renderArgs),
      rightTopLine(renderArgs),
      rightBottomLine(renderArgs),
    ]
  } else if (isNumber(values.x1) && isNumber(values.x2)) {
    return [verticalArea(renderArgs), leftVerticalLine(renderArgs), rightVerticalLine(renderArgs)]
  } else if (isNumber(values.y1) && isNumber(values.y2)) {
    return [
      horizontalArea(renderArgs),
      topHorizontalLine(renderArgs),
      bottomHorizontalLine(renderArgs),
    ]
  }
  return {showHover: false, type: 'area', path2D: getPath2D()}
}

export default function brushes(props) {
  if (!props.xScale && !props.yScale) return undefined
  return flatten(map(flatten(props.data), datum => brushesRender(props, datum)))
}
