// Copyright 2018 Kensho Technologies, LLC.

import {some} from 'lodash'

function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true
  }
  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false
  }
  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)
  if (keysA.length !== keysB.length) {
    return false
  }
  // Test for A's keys different from B.
  const bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB)
  for (let i = 0; i < keysA.length; i++) {
    if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false
    }
  }
  return true
}

export const getRerunCheckForNames = (keyNames, rootNames) => (props, prevProps) => {
  const checkRootNames = some(rootNames, name => props[`${name}`] !== prevProps[`${name}`])
  if (checkRootNames) return true
  if (!keyNames) return false
  return some(props.groupedKeys, key =>
    some(keyNames, name => props[`${key}${name}`] !== prevProps[`${key}${name}`])
  )
}

export const rerunCheckGetTypes = getRerunCheckForNames(['Type', 'Array'])
export const rerunCheckGetDomains = getRerunCheckForNames(['Domain', 'Array', 'Type', 'ZeroBased'])
export const rerunCheckGetPlotRect = getRerunCheckForNames(
  ['Array', 'ShowTicks', 'ShowLabel'],
  ['width', 'height', 'margin', 'proportion']
)
export const rerunCheckGetRanges = getRerunCheckForNames(['Range', 'Type', 'Array'], ['plotRect'])
export const rerunCheckGetTickCounts = getRerunCheckForNames(['TickCount', 'Range', 'TickSpace'])
export const rerunCheckGetScales = getRerunCheckForNames([
  'Type',
  'Domain',
  'Range',
  'TickCount',
  'Nice',
])

export const rerunCheckGetRenderLayers = getRerunCheckForNames(
  ['Array', 'Domain', 'Range', 'Scale'],
  ['data']
)

// check change for root and layers on: accessors, data, and skipExtractArrays
export function rerunCheckGetDimArrays(props, prevProps) {
  // now there are layers
  if (!prevProps.layers && props.layers) return true
  // for each layer
  const layerCheck = some(props.layers, (layer, i) => {
    // should skip
    if (layer.skipExtractArrays) return false
    const prevLayer = prevProps.layers[i]
    // new layer
    if (!prevLayer) return true
    // new data on the layer
    if (layer.data !== prevLayer.data) return true
    // new accessors on the layer
    return !shallowEqual(layer.localAccessors, prevLayer.localAccessors)
  })
  if (layerCheck) return true
  return false
}
