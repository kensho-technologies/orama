
import {map, flatten, isNumber} from 'lodash'
import {getPath2D} from '../../utils/path2DUtils'
import {plotValue} from '../../Layer/plotValue'
import {BACKGROUND_OFFSET} from '../../chartCore/defaults'

const rangesRender = (props, datum) => {
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
  if (isNumber(x1) && isNumber(x2) && isNumber(y1) && isNumber(y2)) {
    path2D.rect(
      x1, y1,
      x2 - x1, y2 - y1
    )
  } else if (isNumber(x1) && isNumber(x2)) {
    path2D.rect(
      x1, plotRect.y - backgroundOffset,
      x2 - x1, plotRect.height + backgroundOffset * 2
    )
  } else if (isNumber(y1) && isNumber(y2)) {
    path2D.rect(
      plotRect.x - backgroundOffset, y1,
      plotRect.width + backgroundOffset * 2, y2 - y1
    )
  }
  return {
    alpha,
    data: datum,
    fill,
    path2D,
    type: 'area',
  }
}

export const ranges = props => {
  if (!props.xScale && !props.yScale) return undefined
  return map(
    flatten(props.data),
    datum => rangesRender(props, datum),
  )
}
