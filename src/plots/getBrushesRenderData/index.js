
import {getPath2D} from '../../utils/path2DUtils'

const BRUSH_HANDLE_OFFSET = 5

export const centerArea = (
  {x1, x2, y1, y2, datum, alpha, fill}
) => {
  const path2D = getPath2D()
  path2D.rect(
    x1, y1,
    x2 - x1, y2 - y1
  )
  return {
    alpha,
    data: datum,
    fill,
    hoverAlpha: 0.1,
    path2D,
    type: 'area',
  }
}
export const verticalArea = (
  {x1, x2, plotRect, backgroundOffset, datum, alpha, fill}
) => {
  const path2D = getPath2D()
  path2D.rect(
    x1, plotRect.y - backgroundOffset,
    x2 - x1, plotRect.height + backgroundOffset * 2
  )
  return {
    alpha,
    data: datum,
    fill,
    hoverAlpha: 0.1,
    path2D,
    type: 'area',
  }
}
export const horizontalArea = (
  {y1, y2, plotRect, backgroundOffset, datum, alpha, fill}
) => {
  const path2D = getPath2D()
  path2D.rect(
    plotRect.x - backgroundOffset, y1,
    plotRect.width + backgroundOffset * 2, y2 - y1
  )
  return {
    alpha,
    data: datum,
    fill,
    hoverAlpha: 0.1,
    path2D,
    type: 'area',
  }
}
export const rightTopLine = (
  {x2, y1, datum}
) => {
  const path2D = getPath2D()
  const hover1stPath2D = getPath2D()
  path2D.moveTo(x2 - BRUSH_HANDLE_OFFSET, y1)
  path2D.lineTo(x2, y1)
  path2D.lineTo(x2, y1 + BRUSH_HANDLE_OFFSET)
  hover1stPath2D.rect(
    x2 - 15, y1 - 20,
    35, 35
  )
  return {
    alpha: 0,
    lineWidth: 3,
    data: datum,
    path2D,
    hover1stPath2D,
    type: 'line',
  }
}
export const rightBottomLine = (
  {x2, y2, datum}
) => {
  const path2D = getPath2D()
  const hover1stPath2D = getPath2D()
  path2D.moveTo(x2 - BRUSH_HANDLE_OFFSET, y2)
  path2D.lineTo(x2, y2)
  path2D.lineTo(x2, y2 - BRUSH_HANDLE_OFFSET)
  hover1stPath2D.rect(
    x2 - 15, y2 - 15,
    35, 35
  )
  return {
    alpha: 0,
    lineWidth: 3,
    data: datum,
    path2D,
    hover1stPath2D,
    type: 'line',
  }
}
export const leftTopLine = (
  {x1, y1, datum}
) => {
  const path2D = getPath2D()
  const hover1stPath2D = getPath2D()
  path2D.moveTo(x1, y1 + BRUSH_HANDLE_OFFSET)
  path2D.lineTo(x1, y1)
  path2D.lineTo(x1 + BRUSH_HANDLE_OFFSET, y1)
  hover1stPath2D.rect(
    x1 - 20, y1 - 20,
    35, 35
  )
  return {
    alpha: 0,
    lineWidth: 3,
    data: datum,
    path2D,
    hover1stPath2D,
    type: 'line',
  }
}
export const leftBottomLine = (
  {x1, y2, datum}
) => {
  const path2D = getPath2D()
  const hover1stPath2D = getPath2D()
  path2D.moveTo(x1, y2 - BRUSH_HANDLE_OFFSET)
  path2D.lineTo(x1, y2)
  path2D.lineTo(x1 + BRUSH_HANDLE_OFFSET, y2)
  hover1stPath2D.rect(
    x1 - 20, y2 - 20,
    35, 35
  )
  return {
    alpha: 0,
    lineWidth: 3,
    data: datum,
    path2D,
    hover1stPath2D,
    type: 'line',
  }
}
export const leftVerticalLine = (
  {x1, plotRect, backgroundOffset, datum}
) => {
  const path2D = getPath2D()
  const hover1stPath2D = getPath2D()
  path2D.moveTo(
    x1, plotRect.y - backgroundOffset + BRUSH_HANDLE_OFFSET)
  path2D.lineTo(
    x1, plotRect.y + plotRect.height + backgroundOffset - BRUSH_HANDLE_OFFSET)
  hover1stPath2D.rect(
    x1 - 15, plotRect.y - backgroundOffset,
    20, plotRect.height + backgroundOffset * 2
  )
  return {
    alpha: 0,
    lineWidth: 3,
    data: datum,
    path2D,
    hover1stPath2D,
    type: 'line',
  }
}
export const leftCenterLine = (
  {x1, y1, y2, datum}
) => {
  const path2D = getPath2D()
  const hover1stPath2D = getPath2D()
  path2D.moveTo(
    x1, y1 + BRUSH_HANDLE_OFFSET)
  path2D.lineTo(
    x1, y2 - BRUSH_HANDLE_OFFSET)
  hover1stPath2D.rect(
    x1 - 15, y1 + BRUSH_HANDLE_OFFSET,
    20, y2 - y1 - BRUSH_HANDLE_OFFSET * 2
  )
  return {
    alpha: 0,
    lineWidth: 3,
    data: datum,
    path2D,
    hover1stPath2D,
    type: 'line',
  }
}
export const rightVerticalLine = (
  {x2, plotRect, backgroundOffset, datum}
) => {
  const path2D = getPath2D()
  const hover1stPath2D = getPath2D()
  path2D.moveTo(
    x2, plotRect.y - backgroundOffset + BRUSH_HANDLE_OFFSET)
  path2D.lineTo(
    x2, plotRect.y + plotRect.height + backgroundOffset - BRUSH_HANDLE_OFFSET)
  hover1stPath2D.rect(
    x2 - 10, plotRect.y - backgroundOffset,
    25, plotRect.height + backgroundOffset * 2
  )
  return {
    alpha: 0,
    lineWidth: 3,
    data: datum,
    path2D,
    hover1stPath2D,
    type: 'line',
  }
}
export const rightCenterLine = (
  {x2, y1, y2, datum}
) => {
  const path2D = getPath2D()
  const hover1stPath2D = getPath2D()
  path2D.moveTo(
    x2, y1 + BRUSH_HANDLE_OFFSET)
  path2D.lineTo(
    x2, y2 - BRUSH_HANDLE_OFFSET)
  hover1stPath2D.rect(
    x2 - 10, y1 + BRUSH_HANDLE_OFFSET,
    25, y2 - y1 - BRUSH_HANDLE_OFFSET * 2
  )
  return {
    alpha: 0,
    lineWidth: 3,
    data: datum,
    path2D,
    hover1stPath2D,
    type: 'line',
  }
}
export const topHorizontalLine = (
  {y1, plotRect, backgroundOffset, datum}
) => {
  const path2D = getPath2D()
  const hover1stPath2D = getPath2D()
  path2D.moveTo(
    plotRect.x - backgroundOffset + BRUSH_HANDLE_OFFSET, y1
  )
  path2D.lineTo(
    plotRect.x + plotRect.width + backgroundOffset - BRUSH_HANDLE_OFFSET, y1
  )
  hover1stPath2D.rect(
    plotRect.x - backgroundOffset, y1 - 15,
    plotRect.width + backgroundOffset * 2, 20
  )
  return {
    alpha: 0,
    lineWidth: 3,
    data: datum,
    path2D,
    hover1stPath2D,
    type: 'line',
  }
}
export const topCenterLine = (
  {x1, x2, y1, datum}
) => {
  const path2D = getPath2D()
  const hover1stPath2D = getPath2D()
  path2D.moveTo(x1 + BRUSH_HANDLE_OFFSET, y1)
  path2D.lineTo(x2 - BRUSH_HANDLE_OFFSET, y1)
  hover1stPath2D.rect(
    x1, y1 - 15,
    x2 - x1, 20
  )
  return {
    alpha: 0,
    lineWidth: 3,
    data: datum,
    path2D,
    hover1stPath2D,
    type: 'line',
  }
}
export const bottomHorizontalLine = (
  {y2, plotRect, backgroundOffset, datum}
) => {
  const path2D = getPath2D()
  const hover1stPath2D = getPath2D()
  path2D.moveTo(
    plotRect.x - backgroundOffset + BRUSH_HANDLE_OFFSET, y2
  )
  path2D.lineTo(
    plotRect.x + plotRect.width + backgroundOffset - BRUSH_HANDLE_OFFSET, y2
  )
  hover1stPath2D.rect(
    plotRect.x - backgroundOffset, y2 - 10,
    plotRect.width + backgroundOffset * 2, 25
  )
  return {
    alpha: 0,
    lineWidth: 3,
    data: datum,
    path2D,
    hover1stPath2D,
    type: 'line',
  }
}
export const bottomCenterLine = (
  {x1, x2, y2, datum}
) => {
  const path2D = getPath2D()
  const hover1stPath2D = getPath2D()
  path2D.moveTo(x1 + BRUSH_HANDLE_OFFSET, y2)
  path2D.lineTo(x2 - BRUSH_HANDLE_OFFSET, y2)
  hover1stPath2D.rect(
    x1, y2 - 10,
    x2 - x1, 25
  )
  return {
    alpha: 0,
    lineWidth: 3,
    data: datum,
    path2D,
    hover1stPath2D,
    type: 'line',
  }
}
