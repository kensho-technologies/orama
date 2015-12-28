
import {map, flatten, isNumber} from 'lodash'

import {BACKGROUND_OFFSET} from '../../Chart/defaults'
import {getPath2D} from '../../utils/path2DUtils'
import {bottomHorizontalLine} from '../../plots/getBrushesRenderData'
import {bottomCenterLine} from '../../plots/getBrushesRenderData'
import {centerArea} from '../../plots/getBrushesRenderData'
import {verticalArea} from '../../plots/getBrushesRenderData'
import {horizontalArea} from '../../plots/getBrushesRenderData'
import {leftVerticalLine} from '../../plots/getBrushesRenderData'
import {leftCenterLine} from '../../plots/getBrushesRenderData'
import {rightVerticalLine} from '../../plots/getBrushesRenderData'
import {rightCenterLine} from '../../plots/getBrushesRenderData'
import {topHorizontalLine} from '../../plots/getBrushesRenderData'
import {topCenterLine} from '../../plots/getBrushesRenderData'
import {rightBottomLine} from '../../plots/getBrushesRenderData'
import {leftBottomLine} from '../../plots/getBrushesRenderData'
import {leftTopLine} from '../../plots/getBrushesRenderData'
import {rightTopLine} from '../../plots/getBrushesRenderData'
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
  const stroke = plotValue(props, datum, 'fill')

  const renderArgs = {
    x1, x2, y1, y2, alpha, fill, stroke, plotRect, backgroundOffset, datum,
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
