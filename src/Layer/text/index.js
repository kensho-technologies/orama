
import {map, flatten, get} from 'lodash'
import {getMidX, getMidY} from '../../utils/rectUtils'
import {plotValue} from '../../Layer/plotValue'

/*
generates the array of render data
*/
export const getTextRenderData = (props, datum) => {
  const x = plotValue(props, datum, 'x', getMidX(props.plotRect))
  const y = plotValue(props, datum, 'y', getMidY(props.plotRect))
  const alpha = plotValue(props, datum, 'alpha')
  const label = props.labelValue || get(datum, props.label) || datum.label
  const textBaseline = props.textBaselineValue || get(datum, props.textBaseline) || datum.textBaseline
  const textAlign = props.textAlignValue || get(datum, props.textAlign) || datum.textAlign
  const fill = plotValue(props, datum, 'fill')
  return {
    alpha,
    fill,
    textAlign,
    textBaseline,
    type: 'text',
    label,
    x,
    y,
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
