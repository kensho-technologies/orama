
import _ from 'lodash'
import shallowEqual from 'on-update/lib/shallowEqual'

export const getRerunCheckForNames = (keyNames, rootNames) => (props, prevProps) => {
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

export const rerunCheckAddTypes = getRerunCheckForNames(
  ['Type', 'Array']
)
export const rerunCheckAddDomains = getRerunCheckForNames(
  ['Domain', 'Array', 'Type', 'ZeroBased']
)
export const rerunCheckAddPlotRect = getRerunCheckForNames(
  ['Array', 'ShowTicks', 'ShowLabel'],
  ['width', 'height', 'margin', 'proportion']
)
export const rerunCheckAddRanges = getRerunCheckForNames(
  ['Range', 'Type', 'Array'],
  ['plotRect']
)
export const rerunCheckAddTickCounts = getRerunCheckForNames(
  ['TickCount', 'Range', 'TickSpace']
)
export const rerunCheckAddScales = getRerunCheckForNames(
  ['Type', 'Domain', 'Range', 'TickCount', 'Nice']
)

export const rerunCheckRenderLayer = getRerunCheckForNames(
  ['Array', 'Domain', 'Range', 'Scale'],
  ['data']
)

// check change for root and layers on: accessors, data, and skipExtractArrays
export const rerunCheckDimArrays = (props, prevProps) => {
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
