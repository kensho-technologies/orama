// Copyright 2018 Kensho Technologies, LLC.

import {map} from 'lodash'

import getDimArrays from './getDimArrays'
import {getLayer} from './getRenderLayers'
import {getPlotRect} from './getPlotRect'
import {getDomains, getRanges, getScales, getTickCounts, getTypes} from './getForProps'
import {
  rerunCheckGetDimArrays,
  rerunCheckGetTypes,
  rerunCheckGetDomains,
  rerunCheckGetRanges,
  rerunCheckGetPlotRect,
  rerunCheckGetTickCounts,
  rerunCheckGetScales,
  rerunCheckGetRenderLayers,
} from './rerunChecks'

export function getMemoize(rerunCheck, transformFunc, isLayer) {
  let savedResult
  let prevProps = {}
  function memoizer(props) {
    const rerun = rerunCheck(props, prevProps)
    prevProps = props
    if (rerun) {
      savedResult = transformFunc(props)
    }
    if (isLayer) {
      return savedResult || transformFunc(props)
    }
    return savedResult || transformFunc(props)
  }
  return memoizer
}

export const getMemoizeDimArrays = () => getMemoize(rerunCheckGetDimArrays, getDimArrays)
export const getMemoizeTypes = () => getMemoize(rerunCheckGetTypes, getTypes)
export const getMemoizeDomains = () => getMemoize(rerunCheckGetDomains, getDomains)
export const getMemoizePlotRect = () => getMemoize(rerunCheckGetPlotRect, getPlotRect)
export const getMemoizeRanges = () => getMemoize(rerunCheckGetRanges, getRanges)
export const getMemoizeTickCounts = () => getMemoize(rerunCheckGetTickCounts, getTickCounts)
export const getMemoizeScales = () => getMemoize(rerunCheckGetScales, getScales)
export const getMemoizeRenderLayer = () => getMemoize(rerunCheckGetRenderLayers, getLayer, true)

export function getMemoizeRenderLayers() {
  const layersMemoize = []
  function memoizeForLayers(props) {
    const renderLayers = map(props.layers, (layer, i) => {
      let layerMemoize = layersMemoize[i]
      if (!layerMemoize) {
        layersMemoize[i] = getMemoizeRenderLayer()
        layerMemoize = layersMemoize[i]
      }
      return layerMemoize({...props, ...layer})
    })
    return renderLayers
  }
  return memoizeForLayers
}
