
import _ from 'lodash'

import {
  addMaps,
} from './addMethods'

const render = props => {
  if (!props.plotFunc) return undefined
  return props.plotFunc(props)
}
export const getRenderData = props => {
  const rootRenderData = props.plotFunc(addMaps(props))
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
