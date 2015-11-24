
import _ from 'lodash'
import utils from '../../utils'
import {plotValue} from '../plotValue'
import {points} from '../points'

export const areas = props => {
  if (!props.xMap || !props.yMap) return undefined
  const {data} = props
  const path2D = utils.path()
  path2D.moveTo(
    plotValue(props, _.first(data), 'x'),
    plotValue(props, _.first(data), 'y')
  )
  _.each(data, d => {
    path2D.lineTo(
      plotValue(props, d, 'x'),
      plotValue(props, d, 'y')
    )
  })
  _.eachRight(data, d => {
    path2D.lineTo(
      plotValue(props, d, 'x'),
      plotValue(props, d, 'y0'),
    )
  })
  path2D.closePath()
  const areaRender = {
    type: 'area',
    path2D,
  }
  const pointData = points(props)
  const pointData0 = points({
    ...props,
    y: props.y0,
  })
  return [].concat(areaRender, pointData, pointData0)
}
