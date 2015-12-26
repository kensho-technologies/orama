
import {map, flatten, isNumber} from 'lodash'

import {BACKGROUND_OFFSET} from '../../Chart/defaults'
import {getBottomRenderData} from '../../plots/getBrushesRenderData'
import {getLeftRenderData} from '../../plots/getBrushesRenderData'
import {getPath2D} from '../../utils/path2DUtils'
import {getRightRenderData} from '../../plots/getBrushesRenderData'
import {getTopRenderData} from '../../plots/getBrushesRenderData'
import {plotValue} from '../../plots/plotValue'

const brushesRender = (props, datum) => {
  const {
    backgroundOffset = BACKGROUND_OFFSET,
    plotRect,
  } = props
  const path2D = getPath2D()
  const x1 = plotValue(props, datum, 'x1')
  const x2 = plotValue(props, datum, 'x2')
  const y1 = plotValue(props, datum, 'y1')
  const y2 = plotValue(props, datum, 'y2')
  const alpha = plotValue(props, datum, 'alpha')
  const fill = plotValue(props, datum, 'fill')

  const renderArgs = {
    x1, x2, y1, y2, alpha, fill, plotRect, backgroundOffset, datum,
  }

  if (isNumber(x1) && isNumber(x2) && isNumber(y1) && isNumber(y2)) {
    path2D.rect(
      x1, y1,
      x2 - x1, y2 - y1
    )
    return [
      {
        alpha,
        data: datum,
        fill,
        hoverFill: 'transparent',
        path2D,
        type: 'area',
      },
      getLeftRenderData(renderArgs),
      getRightRenderData(renderArgs),
      getTopRenderData(renderArgs),
      getBottomRenderData(renderArgs),
    ]
  } else if (isNumber(x1) && isNumber(x2)) {
    path2D.rect(
      x1, plotRect.y - backgroundOffset,
      x2 - x1, plotRect.height + backgroundOffset * 2
    )
    return [
      {
        alpha,
        data: datum,
        fill,
        hoverAlpha: 0.1,
        path2D,
        type: 'area',
      },
      getLeftRenderData(renderArgs),
      getRightRenderData(renderArgs),
    ]
  } else if (isNumber(y1) && isNumber(y2)) {
    path2D.rect(
      plotRect.x - backgroundOffset, y1,
      plotRect.width + backgroundOffset * 2, y2 - y1
    )
    return [
      {
        alpha,
        data: datum,
        fill,
        hoverAlpha: 0.1,
        path2D,
        type: 'area',
      },
      getTopRenderData(renderArgs),
      getBottomRenderData(renderArgs),
    ]
  }
  return {
    alpha,
    data: datum,
    fill,
    hoverFill: 'transparent',
    path2D,
    type: 'area',
  }
}

export const brushes = props => {
  if (!props.xScale && !props.yScale) return undefined
  return flatten(map(
    flatten(props.data),
    datum => brushesRender(props, datum),
  ))
}
