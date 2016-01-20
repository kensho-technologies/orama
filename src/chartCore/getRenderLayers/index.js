
import _ from 'lodash'

/*
generate the renderLayers and renderData by running the plot functions of the props root and the props.layers
*/

export const getLayer = props => {
  const {
    plot = () => [],
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