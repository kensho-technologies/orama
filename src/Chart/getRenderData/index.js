
import _ from 'lodash'
import {points} from '../plots'

/*
generate the render data by running the plot functions of the props root and the props.layers
*/

const render = props => {
  const {
    plot = points,
  } = props
  return {
    props,
    values: plot(props),
  }
}
export const getRenderData = props => {
  const rootRenderData = render(props)
  const layersRenderData = _.map(
    props.layers,
    layer => render({...props, ...layer}),
  )
  return [
    rootRenderData, ...layersRenderData,
  ]
}
