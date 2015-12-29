
import _ from 'lodash'
import {points} from '../../plots'

/*
generate the renderLayers and renderData by running the plot functions of the props root and the props.layers
*/

export const getLayer = props => {
  const {
    plot = points,
  } = props
  return {
    layerProps: props,
    renderData: plot(props),
  }
}
export const getRenderLayers = props => {
  return _.map(
    props.layers,
    layer => getLayer({...props, ...layer}),
  )
}
