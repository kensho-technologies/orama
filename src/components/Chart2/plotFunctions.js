
import _ from 'lodash'
import utils from '../../utils'
import {plotValue} from './plotValue'

export const pointsDataMap = (props, d) => {
  const path2D = utils.path()
  const x = plotValue(props, 'x', d, props.plotRect.x)
  const y = plotValue(props, 'y', d, props.plotRect.y)
  const r = plotValue(props, 'r', d, 5)
  const color = plotValue(props, 'color', d, 'steelblue')
  path2D.arc(x, y, r, 0, 2 * Math.PI)
  return {
    type: 'area',
    path2D,
    alpha: 1,
    fill: color,
  }
}
const retrievePoinstData = data => {
  if (_.isArray(_.first(data))) return _.flatten(data)
  return data
}
export const points = props => {
  if (!props.xMap && !props.yMap) return undefined
  return _.map(
    retrievePoinstData(props.data),
    _.partial(pointsDataMap, props)
  )
}
const getLine = (props, data) => {
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
  const lineRender = {
    type: 'line',
    path2D,
  }
  const pointData = points(props)
  return [].concat(lineRender, pointData)
}
export const lines = props => {
  if (!props.xMap || !props.yMap) return undefined
  if (_.isArray(_.first(props.data))) {
    return _.reduce(
      props.data,
      (acc, data) => acc.concat(getLine(props, data)),
      []
    )
  }
  return getLine(props, props.data)
}
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
  const color = plotValue(props, 'color', d, 'steelblue')
  const height = props.plotRect.height / props.yDomain.length
  path2D.rect(props.plotRect.x, y - height / 2, x - props.plotRect.x, height - 2)
  return {
    type: 'area',
    path2D,
    alpha: 1,
    fill: color,
  }
}
export const bars = props => {
  if (!props.xMap || !props.yMap) return undefined
  return _.map(
    props.data,
    _.partial(barsDataMap, props)
  )
}
