// Copyright 2018 Kensho Technologies, LLC.

import {map} from 'lodash'

import {getDimArrays} from '../../chartCore/getDimArrays'
import {getDomains} from '../../chartCore/getForProps'
import {getLayer} from '../../chartCore/getRenderLayers'
import {getPlotRect} from '../../chartCore/getPlotRect'
import {getRanges} from '../../chartCore/getForProps'
import {getScales} from '../../chartCore/getForProps'
import {getTickCounts} from '../../chartCore/getForProps'
import {getTypes} from '../../chartCore/getForProps'
import * as rerunChecks from '../../chartCore/rerunChecks'

export const getMemoize = (rerunCheck, transformFunc, isLayer) => {
  let savedResult
  let prevProps = {}
  const memoizer = props => {
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

export const getMemoizeDimArrays = () => getMemoize(
  rerunChecks.rerunCheckGetDimArrays, getDimArrays
)
export const getMemoizeTypes = () => getMemoize(
  rerunChecks.rerunCheckGetTypes, getTypes
)
export const getMemoizeDomains = () => getMemoize(
  rerunChecks.rerunCheckGetDomains, getDomains
)
export const getMemoizePlotRect = () => getMemoize(
  rerunChecks.rerunCheckGetPlotRect, getPlotRect
)
export const getMemoizeRanges = () => getMemoize(
  rerunChecks.rerunCheckGetRanges, getRanges
)
export const getMemoizeTickCounts = () => getMemoize(
  rerunChecks.rerunCheckGetTickCounts, getTickCounts
)
export const getMemoizeScales = () => getMemoize(
  rerunChecks.rerunCheckGetScales, getScales
)
export const getMemoizeRenderLayer = () => getMemoize(
  rerunChecks.rerunCheckGetRenderLayers, getLayer, true
)

export const getMemoizeRenderLayers = () => {
  const layersMemoize = []
  const memoizeForLayers = props => {
    const renderLayers = map(
      props.layers,
      (layer, i) => {
        let layerMemoize = layersMemoize[i]
        if (!layerMemoize) {
          layersMemoize[i] = getMemoizeRenderLayer()
          layerMemoize = layersMemoize[i]
        }
        return layerMemoize({...props, ...layer})
      }
    )
    return renderLayers
  }
  return memoizeForLayers
}
