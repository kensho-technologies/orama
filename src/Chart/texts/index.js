
import _ from 'lodash'
import {getMidX, getMidY} from '../../utils/rectUtils'
import {plotValue} from '../plotValue'

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
export const textsDataMap = (props, datum) => {
  const x = plotValue(
    props, datum, 'x', getMidX(props.plotRect)
  )
  const y = plotValue(
    props, datum, 'y', getMidY(props.plotRect)
  )
  const alpha = plotValue(
    props, datum, 'alpha', getMidY(props.plotRect)
  )
  const value = props.labelValue || _.get(datum, props.label) || datum.label
  const textBaseline = props.textBaselineValue || _.get(datum, props.textBaseline) || datum.textBaseline
  const textAlign = props.textAlignValue || _.get(datum, props.textAlign) || datum.textAlign
  const fill = plotValue(props, datum, 'fill')
  const renderDatum = {
    alpha,
    fill,
    textAlign,
    textBaseline,
    type: 'text',
    value,
    x,
    y,
  }
  return renderDatum
}
/*
If array of arrays (grouped data), flatten before sending to `textsDataMap`.
There's no reason for the points plot to deal with grouped data
*/
const retrieveTextsData = data => {
  if (_.isArray(_.first(data))) return _.flatten(data)
  return data
}
/*
Main entry point, if there's only `xMap` or `yMap` it will output an one dimension plot.
*/
export const texts = props => {
  if (!props.xScale && !props.yScale) return undefined
  return _.map(
    retrieveTextsData(props.data),
    datum => textsDataMap(props, datum),
  )
}
