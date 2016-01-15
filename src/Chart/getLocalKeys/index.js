
import _ from 'lodash'
import {ACCESSORS_NAMES} from '../../Chart/defaults'

export const layerMapper = layer => {
  const localDefinedAccessors = _.pick(
    layer, layer.accessorsNames || ACCESSORS_NAMES
  )
  return {
    ...layer,
    localDefinedAccessors,
    localKeys: _.keys(localDefinedAccessors),
  }
}
export const getLocalKeys = props => ({
  layers: _.map(props.layers, layerMapper),
})
