
import {getPath2D} from '../../utils/path2DUtils'

const BRUSH_HANDLE_OFFSET = 5

// {x1, x2, y1, y2, plotRect, backgroundOffset, datum}
// TODO(Luis): get fill, alpha,... from brushes render

export const getCenterRenderData = (
  {x1, x2, y1, y2, plotRect, backgroundOffset, datum}
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
    hoverFill: 'transparent',
    path2D,
    type: 'area',
  }
}

export const getLeftRenderData = (
  {x1, plotRect, backgroundOffset, datum}
) => {
  const path2DLeft = getPath2D()
  const path2DLeftHover = getPath2D()
  path2DLeft.moveTo(
    x1, plotRect.y - backgroundOffset + BRUSH_HANDLE_OFFSET)
  path2DLeft.lineTo(
    x1, plotRect.y + plotRect.height + backgroundOffset - BRUSH_HANDLE_OFFSET)
  path2DLeftHover.rect(
    x1 - 15, plotRect.y - backgroundOffset,
    20, plotRect.height + backgroundOffset * 2
  )
  return {
    alpha: 0,
    lineWidth: 3,
    data: datum,
    path2D: path2DLeft,
    hover1stPath2D: path2DLeftHover,
    type: 'line',
  }
}

export const getRightRenderData = (
  {x2, plotRect, backgroundOffset, datum}
) => {
  const path2DRight = getPath2D()
  const path2DRightHover = getPath2D()
  path2DRight.moveTo(
    x2, plotRect.y - backgroundOffset + BRUSH_HANDLE_OFFSET)
  path2DRight.lineTo(
    x2, plotRect.y + plotRect.height + backgroundOffset - BRUSH_HANDLE_OFFSET)
  path2DRightHover.rect(
    x2 - 10, plotRect.y - backgroundOffset,
    25, plotRect.height + backgroundOffset * 2
  )
  return {
    alpha: 0,
    lineWidth: 3,
    data: datum,
    path2D: path2DRight,
    hover1stPath2D: path2DRightHover,
    type: 'line',
  }
}

export const getTopRenderData = (
  {y1, plotRect, backgroundOffset, datum}
) => {
  const path2DTop = getPath2D()
  const path2DTopHover = getPath2D()
  path2DTop.moveTo(
    plotRect.x - backgroundOffset + BRUSH_HANDLE_OFFSET, y1
  )
  path2DTop.lineTo(
    plotRect.x + plotRect.width + backgroundOffset - BRUSH_HANDLE_OFFSET, y1
  )
  path2DTopHover.rect(
    plotRect.x - backgroundOffset, y1 - 15,
    plotRect.width + backgroundOffset * 2, 20
  )
  return {
    alpha: 0,
    lineWidth: 3,
    data: datum,
    path2D: path2DTop,
    hover1stPath2D: path2DTopHover,
    type: 'line',
  }
}

export const getBottomRenderData = (
  {y2, plotRect, backgroundOffset, datum}
) => {
  const path2DBottom = getPath2D()
  const path2DBottomHover = getPath2D()
  path2DBottom.moveTo(
    plotRect.x - backgroundOffset + BRUSH_HANDLE_OFFSET, y2
  )
  path2DBottom.lineTo(
    plotRect.x + plotRect.width + backgroundOffset - BRUSH_HANDLE_OFFSET, y2
  )
  path2DBottomHover.rect(
    plotRect.x - backgroundOffset, y2 - 10,
    plotRect.width + backgroundOffset * 2, 25
  )
  return {
    alpha: 0,
    lineWidth: 3,
    data: datum,
    path2D: path2DBottom,
    hover1stPath2D: path2DBottomHover,
    type: 'line',
  }
}
