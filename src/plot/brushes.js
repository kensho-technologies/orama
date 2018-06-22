// Copyright 2018 Kensho Technologies, LLC.

import {map, flatten, isNumber} from 'lodash'

import getPath2D from '../utils/getPath2D'

import getPlotValues from './getPlotValues'

const BRUSH_HANDLE_OFFSET = 5
const HOVER_OFFSET = 10
const HOVER_OFFSET_X2 = HOVER_OFFSET * 2

function centerArea({x1, x2, y1, y2, data, fillAlpha, fill}) {
  const path2D = getPath2D()
  path2D.rect(x1, y1, x2 - x1, y2 - y1)
  return {
    name: 'brushesCenter',
    fillAlpha,
    data,
    fill,
    hoverAlpha: 0.1,
    path2D,
    type: 'area',
  }
}

function verticalArea({x1, x2, plotRect, backgroundOffset, data, fillAlpha, fill}) {
  const path2D = getPath2D()
  path2D.rect(x1, plotRect.y - backgroundOffset, x2 - x1, plotRect.height + backgroundOffset * 2)
  return {
    name: 'brushesCenter',
    fillAlpha,
    data,
    fill,
    hoverAlpha: 0.1,
    path2D,
    type: 'area',
  }
}

function horizontalArea({y1, y2, plotRect, backgroundOffset, data, fillAlpha, fill}) {
  const path2D = getPath2D()
  path2D.rect(plotRect.x - backgroundOffset, y1, plotRect.width + backgroundOffset * 2, y2 - y1)
  return {
    name: 'brushesCenter',
    fillAlpha,
    data,
    fill,
    hoverAlpha: 0.1,
    path2D,
    type: 'area',
  }
}

function rightTopLine({x2, y1, data, stroke, lineWidth}) {
  const path2D = getPath2D()
  const hover1stPath2D = getPath2D()
  path2D.moveTo(x2 - BRUSH_HANDLE_OFFSET, y1)
  path2D.lineTo(x2, y1)
  path2D.lineTo(x2, y1 + BRUSH_HANDLE_OFFSET)
  hover1stPath2D.rect(x2 - HOVER_OFFSET, y1 - HOVER_OFFSET, HOVER_OFFSET_X2, HOVER_OFFSET_X2)
  return {
    name: 'brushesRightTop',
    lineWidth,
    stroke,
    data,
    path2D,
    hover1stPath2D,
    type: 'line',
  }
}

function rightBottomLine({x2, y2, data, stroke, lineWidth}) {
  const path2D = getPath2D()
  const hover1stPath2D = getPath2D()
  path2D.moveTo(x2 - BRUSH_HANDLE_OFFSET, y2)
  path2D.lineTo(x2, y2)
  path2D.lineTo(x2, y2 - BRUSH_HANDLE_OFFSET)
  hover1stPath2D.rect(x2 - HOVER_OFFSET, y2 - HOVER_OFFSET, HOVER_OFFSET_X2, HOVER_OFFSET_X2)
  return {
    name: 'brushesRightBottom',
    lineWidth,
    stroke,
    data,
    path2D,
    hover1stPath2D,
    type: 'line',
  }
}

function leftTopLine({x1, y1, data, stroke, lineWidth}) {
  const path2D = getPath2D()
  const hover1stPath2D = getPath2D()
  path2D.moveTo(x1, y1 + BRUSH_HANDLE_OFFSET)
  path2D.lineTo(x1, y1)
  path2D.lineTo(x1 + BRUSH_HANDLE_OFFSET, y1)
  hover1stPath2D.rect(x1 - HOVER_OFFSET, y1 - HOVER_OFFSET, HOVER_OFFSET_X2, HOVER_OFFSET_X2)
  return {
    name: 'brushesLeftTop',
    lineWidth,
    stroke,
    data,
    path2D,
    hover1stPath2D,
    type: 'line',
  }
}

function leftBottomLine({x1, y2, data, stroke, lineWidth}) {
  const path2D = getPath2D()
  const hover1stPath2D = getPath2D()
  path2D.moveTo(x1, y2 - BRUSH_HANDLE_OFFSET)
  path2D.lineTo(x1, y2)
  path2D.lineTo(x1 + BRUSH_HANDLE_OFFSET, y2)
  hover1stPath2D.rect(x1 - HOVER_OFFSET, y2 - HOVER_OFFSET, HOVER_OFFSET_X2, HOVER_OFFSET_X2)
  return {
    name: 'brushesLeftBottom',
    lineWidth,
    stroke,
    data,
    path2D,
    hover1stPath2D,
    type: 'line',
  }
}

function leftVerticalLine({x1, plotRect, backgroundOffset, data, stroke, lineWidth}) {
  const path2D = getPath2D()
  const hover1stPath2D = getPath2D()
  path2D.moveTo(x1, plotRect.y - backgroundOffset)
  path2D.lineTo(x1, plotRect.y + plotRect.height + backgroundOffset)
  hover1stPath2D.rect(
    x1 - HOVER_OFFSET_X2,
    plotRect.y - backgroundOffset,
    HOVER_OFFSET_X2 + 1,
    plotRect.height + backgroundOffset * 2
  )
  return {
    name: 'brushesLeft',
    lineWidth,
    stroke,
    data,
    path2D,
    hover1stPath2D,
    type: 'line',
  }
}

function leftCenterLine({x1, y1, y2, data, stroke, lineWidth}) {
  const path2D = getPath2D()
  const hover1stPath2D = getPath2D()
  path2D.moveTo(x1, y1 + BRUSH_HANDLE_OFFSET)
  path2D.lineTo(x1, y2 - BRUSH_HANDLE_OFFSET)
  hover1stPath2D.rect(
    x1 - HOVER_OFFSET,
    y1 + BRUSH_HANDLE_OFFSET,
    HOVER_OFFSET_X2,
    y2 - y1 - BRUSH_HANDLE_OFFSET * 2
  )
  return {
    name: 'brushesLeft',
    lineWidth,
    stroke,
    data,
    path2D,
    hover1stPath2D,
    type: 'line',
  }
}

function rightVerticalLine({x2, plotRect, backgroundOffset, data, stroke, lineWidth}) {
  const path2D = getPath2D()
  const hover1stPath2D = getPath2D()
  path2D.moveTo(x2, plotRect.y - backgroundOffset)
  path2D.lineTo(x2, plotRect.y + plotRect.height + backgroundOffset)
  hover1stPath2D.rect(
    x2 - 1,
    plotRect.y - backgroundOffset,
    HOVER_OFFSET_X2,
    plotRect.height + backgroundOffset * 2
  )
  return {
    name: 'brushesRight',
    lineWidth,
    stroke,
    data,
    path2D,
    hover1stPath2D,
    type: 'line',
  }
}

function rightCenterLine({x2, y1, y2, data, stroke, lineWidth}) {
  const path2D = getPath2D()
  const hover1stPath2D = getPath2D()
  path2D.moveTo(x2, y1 + BRUSH_HANDLE_OFFSET)
  path2D.lineTo(x2, y2 - BRUSH_HANDLE_OFFSET)
  hover1stPath2D.rect(
    x2 - HOVER_OFFSET,
    y1 + BRUSH_HANDLE_OFFSET,
    HOVER_OFFSET_X2,
    y2 - y1 - BRUSH_HANDLE_OFFSET * 2
  )
  return {
    name: 'brushesRight',
    lineWidth,
    stroke,
    data,
    path2D,
    hover1stPath2D,
    type: 'line',
  }
}

function topHorizontalLine({y1, plotRect, backgroundOffset, data, stroke, lineWidth}) {
  const path2D = getPath2D()
  const hover1stPath2D = getPath2D()
  path2D.moveTo(plotRect.x - backgroundOffset, y1)
  path2D.lineTo(plotRect.x + plotRect.width + backgroundOffset, y1)
  hover1stPath2D.rect(
    plotRect.x - backgroundOffset,
    y1 - HOVER_OFFSET_X2,
    plotRect.width + backgroundOffset * 2,
    HOVER_OFFSET_X2 + 1
  )
  return {
    name: 'brushesTop',
    lineWidth,
    stroke,
    data,
    path2D,
    hover1stPath2D,
    type: 'line',
  }
}

function topCenterLine({x1, x2, y1, data, stroke, lineWidth}) {
  const path2D = getPath2D()
  const hover1stPath2D = getPath2D()
  path2D.moveTo(x1 + BRUSH_HANDLE_OFFSET, y1)
  path2D.lineTo(x2 - BRUSH_HANDLE_OFFSET, y1)
  hover1stPath2D.rect(x1, y1 - HOVER_OFFSET, x2 - x1, HOVER_OFFSET_X2)
  return {
    name: 'brushesTop',
    lineWidth,
    stroke,
    data,
    path2D,
    hover1stPath2D,
    type: 'line',
  }
}

function bottomHorizontalLine({y2, plotRect, backgroundOffset, data, stroke, lineWidth}) {
  const path2D = getPath2D()
  const hover1stPath2D = getPath2D()
  path2D.moveTo(plotRect.x - backgroundOffset, y2)
  path2D.lineTo(plotRect.x + plotRect.width + backgroundOffset, y2)
  hover1stPath2D.rect(
    plotRect.x - backgroundOffset,
    y2 - 1,
    plotRect.width + backgroundOffset * 2,
    HOVER_OFFSET_X2
  )
  return {
    name: 'brushesBottom',
    lineWidth,
    stroke,
    data,
    path2D,
    hover1stPath2D,
    type: 'line',
  }
}

function bottomCenterLine({x1, x2, y2, data, stroke, lineWidth}) {
  const path2D = getPath2D()
  const hover1stPath2D = getPath2D()
  path2D.moveTo(x1 + BRUSH_HANDLE_OFFSET, y2)
  path2D.lineTo(x2 - BRUSH_HANDLE_OFFSET, y2)
  hover1stPath2D.rect(x1, y2 - HOVER_OFFSET, x2 - x1, HOVER_OFFSET_X2)
  return {
    name: 'brushesBottom',
    lineWidth,
    stroke,
    data,
    path2D,
    hover1stPath2D,
    type: 'line',
  }
}

function brushesRender(props, datum) {
  const {backgroundOffset, plotRect} = props
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
  }
  if (isNumber(values.x1) && isNumber(values.x2)) {
    return [verticalArea(renderArgs), leftVerticalLine(renderArgs), rightVerticalLine(renderArgs)]
  }
  if (isNumber(values.y1) && isNumber(values.y2)) {
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
