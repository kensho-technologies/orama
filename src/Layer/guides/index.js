
import {map, flatten, isNumber} from 'lodash'
import {getMinX, getMaxX, getMinY, getMaxY} from '../../utils/rectUtils'
import {getPath2D} from '../../utils/path2DUtils'
import {plotValue} from '../../Layer/plotValue'
import {BACKGROUND_OFFSET} from '../../chartCore/defaults'

const getGuideRenderData = (props, datum) => {
  const {
    backgroundOffset = BACKGROUND_OFFSET,
    plotRect,
  } = props
  const path2D = getPath2D()
  const x = plotValue(props, datum, 'x')
  const y = plotValue(props, datum, 'y')
  const stroke = plotValue(props, datum, 'stroke')
  const lineWidth = plotValue(props, datum, 'lineWidth')
  const lineDash = plotValue(props, datum, 'lineDash')
  const alpha = plotValue(props, datum, 'alpha')
  if (isNumber(x)) {
    path2D.moveTo(x, getMinY(plotRect) - backgroundOffset)
    path2D.lineTo(x, getMaxY(plotRect) + backgroundOffset)
  } else if (isNumber(y)) {
    path2D.moveTo(getMinX(plotRect) - backgroundOffset, y)
    path2D.lineTo(getMaxX(plotRect) + backgroundOffset, y)
  }

  return {
    x, y,
    alpha,
    data: datum,
    lineDash,
    path2D,
    stroke,
    lineWidth,
    type: 'line',
  }
}

export const guides = props => {
  if (!props.xScale && !props.yScale) return undefined
  return map(
    flatten(props.data),
    datum => getGuideRenderData(props, datum),
  )
}
