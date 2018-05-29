// Copyright 2018 Kensho Technologies, LLC.

import {keys, map, pick} from 'lodash'

import {ACCESSORS_NAMES} from '../defaults'

export function layerMapper(layer) {
  const localAccessors = pick(layer, layer.accessorsNames || ACCESSORS_NAMES)
  return {
    ...layer,
    localAccessors,
    localKeys: keys(localAccessors),
  }
}

export default function getLocalKeys(props) {
  return {layers: map(props.layers, layerMapper)}
}
