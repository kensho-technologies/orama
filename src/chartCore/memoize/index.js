
import {getDimArrays} from '../../chartCore/getDimArrays'
import {getTypes} from '../../chartCore/getForProps'
import {getDomains} from '../../chartCore/getForProps'
import {getPlotRect} from '../../chartCore/getPlotRect'
import {getRanges} from '../../chartCore/getForProps'
import {getTickCounts} from '../../chartCore/getForProps'
import {getScales} from '../../chartCore/getForProps'
import {getLayer} from '../../chartCore/getRenderLayers'
import {map} from 'lodash'
import {rerunCheckGetTypes} from '../../chartCore/rerunChecks'
import {rerunCheckGetDimArrays} from '../../chartCore/rerunChecks'
import {rerunCheckGetDomains} from '../../chartCore/rerunChecks'
import {rerunCheckGetPlotRect} from '../../chartCore/rerunChecks'
import {rerunCheckGetRanges} from '../../chartCore/rerunChecks'
import {rerunCheckGetTickCounts} from '../../chartCore/rerunChecks'
import {rerunCheckGetScales} from '../../chartCore/rerunChecks'
import {rerunCheckGetRenderLayers} from '../../chartCore/rerunChecks'

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
  rerunCheckGetDimArrays, getDimArrays
)
export const getMemoizeTypes = () => getMemoize(
  rerunCheckGetTypes, getTypes
)
export const getMemoizeDomains = () => getMemoize(
  rerunCheckGetDomains, getDomains
)
export const getMemoizePlotRect = () => getMemoize(
  rerunCheckGetPlotRect, getPlotRect
)
export const getMemoizeRanges = () => getMemoize(
  rerunCheckGetRanges, getRanges
)
export const getMemoizeTickCounts = () => getMemoize(
  rerunCheckGetTickCounts, getTickCounts
)
export const getMemoizeScales = () => getMemoize(
  rerunCheckGetScales, getScales
)
export const getMemoizeRenderLayer = () => getMemoize(
  rerunCheckGetRenderLayers, getLayer, true
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
