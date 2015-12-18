
import {map, flatten} from 'lodash'
import {getMinX, getMaxX, getMinY, getMaxY} from '../../utils/rectUtils'
import {getPath2D} from '../../utils/path2DUtils'
import {plotValue} from '../../plots/plotValue'
import {BACKGROUND_OFFSET} from '../../Chart/defaults'

const guidesRenderMap = (props, datum) => {
  const {
    backgroundOffset = BACKGROUND_OFFSET,
  } = props
  const path2D = getPath2D()
  const x = plotValue(props, datum, 'x')
  const y = plotValue(props, datum, 'y')
  const stroke = plotValue(props, datum, 'stroke')
  const strokeWidth = plotValue(props, datum, 'strokeWidth')
  const lineDash = plotValue(props, datum, 'lineDash')
  const alpha = plotValue(props, datum, 'alpha')
  if (x) {
    path2D.moveTo(x, getMinY(props.plotRect) - backgroundOffset)
    path2D.lineTo(x, getMaxY(props.plotRect) + backgroundOffset)
  } else if (y) {
    path2D.moveTo(getMinX(props.plotRect) - backgroundOffset, y)
    path2D.lineTo(getMaxX(props.plotRect) + backgroundOffset, y)
  }

  return {
    alpha,
    data: datum,
    lineDash,
    path2D,
    stroke,
    strokeWidth,
    type: 'line',
  }
}

export const guides = props => {
  if (!props.xScale && !props.yScale) return undefined
  return map(
    flatten(props.data),
    datum => guidesRenderMap(props, datum),
  )
}
