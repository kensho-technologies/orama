
import _ from 'lodash'
import utils from '../../utils'
import {plotValue} from '../plotValue'

export const barsDataMap = (props, d) => {
  const path2D = utils.path()
  const x = plotValue(props, d, 'x', props.plotRect.x)
  const y = plotValue(props, d, 'y', props.plotRect.y)
  const fill = plotValue(props, d, 'fill', 'steelblue')
  const height = props.plotRect.height / props.yDomain.length
  path2D.rect(
    props.plotRect.x, y - height / 2,
    x - props.plotRect.x, height - 2
  )
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
