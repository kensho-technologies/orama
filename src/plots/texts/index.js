
import {map, flatten, get} from 'lodash'
import {getMidX, getMidY} from '../../utils/rectUtils'
import {plotValue} from '../../plots/plotValue'

/*
`points` is used to generate render data for dots and similar.
it handles `x`, `y`, 'radius' and 'fill'.

@calling logic
points{
  textsDataMap(retrieveTextsData){}
}
*/

/*
generates the array of render data
*/
export const getTextRenderData = (props, datum) => {
  const x = plotValue(props, datum, 'x', getMidX(props.plotRect))
  const y = plotValue(props, datum, 'y', getMidY(props.plotRect))
  const alpha = plotValue(props, datum, 'alpha')
  const value = props.labelValue || get(datum, props.label) || datum.label
  const textBaseline = props.textBaselineValue || get(datum, props.textBaseline) || datum.textBaseline
  const textAlign = props.textAlignValue || get(datum, props.textAlign) || datum.textAlign
  const fill = plotValue(props, datum, 'fill')
  return {
    alpha,
    fill,
    textAlign,
    textBaseline,
    type: 'text',
    value,
    x,
    y,
  }
}

/*
Main entry point, if there's only `xMap` or `yMap` it will output an one dimension plot.
*/
export const texts = props => {
  if (!props.xScale && !props.yScale) return undefined
  return map(
    flatten(props.data),
    datum => getTextRenderData(props, datum),
  )
}
