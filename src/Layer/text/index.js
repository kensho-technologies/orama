
import {map, flatten} from 'lodash'
import {getMinX, getMinY} from '../../utils/rectUtils'
import {getMidX, getMidY} from '../../utils/rectUtils'
import {getMaxX, getMaxY} from '../../utils/rectUtils'
import {plotValue} from '../../Layer/plotValue'

/*
generates the array of render data
*/
export const getTextRenderData = (props, datum) => {
  const {plotRect} = props

  const alpha = plotValue(props, datum, 'alpha')
  const fill = plotValue(props, datum, 'fill')
  const font = plotValue(props, datum, 'font')
  const rotate = plotValue(props, datum, 'rotate')
  const text = plotValue(props, datum, 'text')
  const textAlign = plotValue(props, datum, 'textAlign')
  const textBaseline = plotValue(props, datum, 'textBaseline')
  const textSnap = plotValue(props, datum, 'textSnap')
  let x = plotValue(props, datum, 'x', getMidX(plotRect))
  const xOffset = plotValue(props, datum, 'xOffset')
  let y = plotValue(props, datum, 'y', getMidY(plotRect))
  const yOffset = plotValue(props, datum, 'yOffset')

  if (textSnap === 'top') y = getMinY(plotRect)
  if (textSnap === 'bottom') y = getMaxY(plotRect)
  if (textSnap === 'left') x = getMinX(plotRect)
  if (textSnap === 'right') x = getMaxX(plotRect)

  return {
    alpha,
    fill,
    font,
    rotate,
    text,
    textAlign,
    textBaseline,
    type: 'text',
    x,
    xOffset,
    y,
    yOffset,
  }
}

/*
Main entry point, if there's only `xMap` or `yMap` it will output an one dimension plot.
*/
export const text = props => {
  if (!props.xScale && !props.yScale) return undefined
  return map(
    flatten(props.data),
    datum => getTextRenderData(props, datum),
  )
}
