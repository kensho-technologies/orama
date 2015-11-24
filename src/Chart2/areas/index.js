
import _ from 'lodash'
import utils from '../../utils'
import {plotValue} from '../plotValue'
import {points} from '../points'

export const areas = props => {
  if (!props.xMap || !props.yMap) return undefined
  const {data} = props
  const path2D = utils.path()
  path2D.moveTo(
    plotValue(props, 'x', _.first(data)),
    plotValue(props, 'y', _.first(data))
  )
  _.each(data, d => {
    path2D.lineTo(
      plotValue(props, 'x', d),
      plotValue(props, 'y', d)
    )
  })
  _.eachRight(data, d => {
    path2D.lineTo(
      plotValue(props, 'x', d),
      plotValue(props, 'y0', d),
    )
  })
  path2D.closePath()
  const areaRender = {
    type: 'area',
    path2D,
  }
  const pointData = points(props)
  return [].concat(areaRender, pointData)
}
