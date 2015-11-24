
import _ from 'lodash'
import utils from '../../utils'
import {plotValue} from '../plotValue'
import {points} from '../points'

export const getArea = (props, data) => {
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
  // if there's no base position accessors
  if (!props.y0 && !props.x0) {
    const y0 = props.yScale(0) || utils.rect.getMaxY(props.plotRect)
    path2D.lineTo(
      plotValue(props, _.last(data), 'x'),
      y0,
    )
    path2D.lineTo(
      plotValue(props, _.first(data), 'x'),
      y0,
    )
  // if the base is on the y axis
  } else if (props.y0 && !props.x0) {
    _.eachRight(data, d => {
      path2D.lineTo(
        plotValue(props, d, 'x'),
        plotValue(props, d, 'y0'),
      )
    })
  // if the base is on the x axis
  } else if (!props.y0 && props.x0) {
    _.eachRight(data, d => {
      path2D.lineTo(
        plotValue(props, d, 'x0'),
        plotValue(props, d, 'y'),
      )
    })
  }
  path2D.closePath()
  const fill = plotValue(props, _.first(data), 'fill')
  const alpha = plotValue(props, _.first(data), 'alpha')
  const areaRender = {
    alpha,
    fill,
    path2D,
    type: 'area',
  }
  const pointData = points(props)
  const pointData0 = points({
    ...props,
    y: props.y0,
  })
  return [].concat(areaRender, pointData, pointData0)
}
export const areas = props => {
  if (!props.xMap || !props.yMap) return undefined
  if (_.isArray(_.first(props.data))) {
    return _.reduce(
      props.data,
      (acc, data) => acc.concat(getArea(props, data)),
      []
    )
  }
  return getArea(props, props.data)
}
