
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
      props.yScale(0),
    )
  })
  const areaRender = {
    type: 'area',
    path2D,
  }
  const pointData = points(props)
  return [].concat(areaRender, pointData)
}
export const barsDataMap = (props, d) => {
  const path2D = utils.path()
  const x = plotValue(props, 'x', d, props.plotRect.x)
  const y = plotValue(props, 'y', d, props.plotRect.y)
  const fill = plotValue(props, 'fill', d, 'steelblue')
  const height = props.plotRect.height / props.yDomain.length
  path2D.rect(props.plotRect.x, y - height / 2, x - props.plotRect.x, height - 2)
  return {
    type: 'area',
    path2D,
    alpha: 1,
    fill,
  }
}
export const bars = props => {
  if (!props.xMap || !props.yMap) return undefined
  return _.map(
    props.data,
    _.partial(barsDataMap, props)
  )
}
