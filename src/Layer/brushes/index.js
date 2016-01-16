
import {map, flatten, isNumber} from 'lodash'

import {BACKGROUND_OFFSET} from '../../chartCore/defaults'
import {getPath2D} from '../../utils/path2DUtils'
import {bottomHorizontalLine} from '../../Layer/getBrushesRenderData'
import {bottomCenterLine} from '../../Layer/getBrushesRenderData'
import {centerArea} from '../../Layer/getBrushesRenderData'
import {verticalArea} from '../../Layer/getBrushesRenderData'
import {horizontalArea} from '../../Layer/getBrushesRenderData'
import {leftVerticalLine} from '../../Layer/getBrushesRenderData'
import {leftCenterLine} from '../../Layer/getBrushesRenderData'
import {rightVerticalLine} from '../../Layer/getBrushesRenderData'
import {rightCenterLine} from '../../Layer/getBrushesRenderData'
import {topHorizontalLine} from '../../Layer/getBrushesRenderData'
import {topCenterLine} from '../../Layer/getBrushesRenderData'
import {rightBottomLine} from '../../Layer/getBrushesRenderData'
import {leftBottomLine} from '../../Layer/getBrushesRenderData'
import {leftTopLine} from '../../Layer/getBrushesRenderData'
import {rightTopLine} from '../../Layer/getBrushesRenderData'
import {plotValue} from '../../Layer/plotValue'

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
  const fillAlpha = plotValue(props, datum, 'fillAlpha', 0.4)
  const fill = plotValue(props, datum, 'fill')
  const stroke = plotValue(props, datum, 'stroke')
  const lineWidth = plotValue(props, datum, 'lineWidth', 3)

  const renderArgs = {
    x1, x2, y1, y2, fillAlpha, fill, stroke, lineWidth, plotRect, backgroundOffset, datum,
  }

  if (isNumber(x1) && isNumber(x2) && isNumber(y1) && isNumber(y2)) {
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
  } else if (isNumber(x1) && isNumber(x2)) {
    return [
      verticalArea(renderArgs),
      leftVerticalLine(renderArgs),
      rightVerticalLine(renderArgs),
    ]
  } else if (isNumber(y1) && isNumber(y2)) {
    return [
      horizontalArea(renderArgs),
      topHorizontalLine(renderArgs),
      bottomHorizontalLine(renderArgs),
    ]
  }
  return {
    data: datum,
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
