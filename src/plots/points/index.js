
import {map, flatten} from 'lodash'
import {getPath2D} from '../../utils/path2DUtils'
import {getMidX, getMidY} from '../../utils/rectUtils'
import {plotValue} from '../../plots/plotValue'

/*
`points` is used to generate render data for dots and similar.
it handles `x`, `y`, 'radius' and 'fill'.

@calling logic
points{
  getPointRenderData(retrievePointsData){}
}
*/

/*
generates the array of render data
*/
const getPointRenderData = (props, datum) => {
  const path2D = getPath2D()
  const hover2ndPath2D = getPath2D()
  const x = plotValue(
    props, datum, 'x', getMidX(props.plotRect)
  )
  const y = plotValue(
    props, datum, 'y', getMidY(props.plotRect)
  )
  const r = plotValue(props, datum, 'radius', 5)
  const fill = plotValue(props, datum, 'fill')
  const alpha = plotValue(props, datum, 'alpha')
  path2D.arc(x, y, r, 0, 2 * Math.PI)
  hover2ndPath2D.arc(x, y, r + 8, 0, 2 * Math.PI)

  return {
    alpha,
    data: datum,
    fill,
    hoverAlpha: props.hoverAlpha || 0.75,
    hover2ndPath2D,
    path2D,
    type: 'area',
  }
}

/*
Main entry point, if there's only `xMap` or `yMap` it will output an one dimension plot.
*/
export const points = props => {
  if (!props.xScale && !props.yScale) return undefined
  return map(
    flatten(props.data),
    datum => getPointRenderData(props, datum),
  )
}
