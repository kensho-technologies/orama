
import _ from 'lodash'
import shallowEqual from 'on-update/lib/shallowEqual'

export const getRerunCheckForKeyNames = (keyNames, rootNames) => (props, prevProps) => {
  const checkRootNames = _.any(
    rootNames,
    name => {
      return props[`${name}`] !== prevProps[`${name}`]
    }
  )
  if (checkRootNames) return true
  if (!keyNames) return false
  return _.any(
    props.groupedKeys,
    key => (_.any(
      keyNames,
      name => {
        return props[`${key}${name}`] !== prevProps[`${key}${name}`]
      }
    ))
  )
}

export const rerunCheckAddTypes = getRerunCheckForKeyNames(
  ['Type', 'Array']
)
export const rerunCheckAddDomains = getRerunCheckForKeyNames(
  ['Domain', 'Array', 'Type', 'ZeroBased']
)
export const rerunCheckAddPlotRect = getRerunCheckForKeyNames(
  ['Array', 'ShowTicks', 'ShowLabel'],
  ['width', 'height', 'margin']
)
export const rerunCheckAddRanges = getRerunCheckForKeyNames(
  ['Range', 'Type', 'Array'],
  ['plotRect']
)
export const rerunCheckAddTickCounts = getRerunCheckForKeyNames(
  ['TickCount', 'Range', 'TickSpace']
)
export const rerunCheckAddScales = getRerunCheckForKeyNames(
  ['Type', 'Domain', 'Range', 'TickCount', 'Nice']
)

// check change for root and layers on: accessors, data, and skipExtractArrays
export const rerunCheckDimArrays = (props, prevProps) => {
  // root data changed
  if (props.data !== prevProps.data) return true
  // root defined accessors changed
  if (!shallowEqual(
    props.localDefinedAccessors,
    prevProps.localDefinedAccessors,
  )) return true
  // now there are layers
  if (!prevProps.layers && props.layers) return true
  // for each layer
  const layerCheck = _.any(
    props.layers,
    (layer, i) => {
      // should skip
      if (layer.skipExtractArrays) return false
      const prevLayer = prevProps.layers[i]
      // new layer
      if (!prevLayer) return true
      // new data on the layer
      if (layer.data !== prevLayer.data) return true
      // new accessors on the layer
      return !shallowEqual(
        layer.localDefinedAccessors,
        prevLayer.localDefinedAccessors,
      )
    }
  )
  if (layerCheck) return true
  return false
}

export const rerunCheckRenderLayer = (props, prevProps) => {
  if (props.data !== prevProps.data) return true
  const keysCheck = _.any(
    props.groupedKeys,
    key => {
      if (props[`${key}Array`] !== prevProps[`${key}Array`]) return true
      if (props[`${key}Domain`] !== prevProps[`${key}Domain`]) return true
      if (props[`${key}Range`] !== prevProps[`${key}Range`]) return true
      if (props[`${key}Scale`] !== prevProps[`${key}Scale`]) return true
    }
  )
  if (keysCheck) return true
  return false
}
