
import _ from 'lodash'

import {
  addMaps,
} from '../addMethods'

/*
generate the render data by running the plot functions of the props root and the props.layers
*/

const render = props => {
  if (!props.plot) return undefined
  return props.plot(props)
}
export const getRenderData = props => {
  const rootRenderData = props.plot(addMaps(props))
  const layersRenderData = _.map(
    props.layers,
    layer => _.flow(
      addMaps,
      render
    )({...props, ...layer}),
  )
  return _.flatten(_.compact([
    rootRenderData, ...layersRenderData,
  ]))
}
