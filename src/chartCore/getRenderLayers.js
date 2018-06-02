// Copyright 2018 Kensho Technologies, LLC.

import {map} from 'lodash'

/*
generate the renderLayers and renderData by running the plot functions of the props root and the props.layers
*/

export function getLayer(props) {
  const {plot} = props
  return {
    layerProps: props,
    renderData: plot ? plot(props) : [],
  }
}

export const getRenderLayers = props => map(props.layers, layer => getLayer({...props, ...layer}))
