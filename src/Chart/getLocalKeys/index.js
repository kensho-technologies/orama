
import _ from 'lodash'
import {ACCESSORS_NAMES} from '../../Chart/defaults'

export const layerMapper = layer => {
  const localAccessors = _.pick(
    layer, layer.accessorsNames || ACCESSORS_NAMES
  )
  return {
    ...layer,
    localAccessors,
    localKeys: _.keys(localAccessors),
  }
}
export const getLocalKeys = props => ({
  layers: _.map(props.layers, layerMapper),
})
