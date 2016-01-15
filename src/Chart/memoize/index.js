
import {getDimArrays} from '../../Chart/getDimArrays'
import {getTypes} from '../../Chart/getForProps'
import {getDomains} from '../../Chart/getForProps'
import {getPlotRect} from '../../Chart/getPlotRect'
import {getRanges} from '../../Chart/getForProps'
import {getTickCounts} from '../../Chart/getForProps'
import {getScales} from '../../Chart/getForProps'
import {getLayer} from '../../Chart/getRenderLayers'
import {map} from 'lodash'
import {rerunCheckGetTypes} from '../../Chart/rerunChecks'
import {rerunCheckGetDimArrays} from '../../Chart/rerunChecks'
import {rerunCheckGetDomains} from '../../Chart/rerunChecks'
import {rerunCheckGetPlotRect} from '../../Chart/rerunChecks'
import {rerunCheckGetRanges} from '../../Chart/rerunChecks'
import {rerunCheckGetTickCounts} from '../../Chart/rerunChecks'
import {rerunCheckGetScales} from '../../Chart/rerunChecks'
import {rerunCheckGetRenderLayers} from '../../Chart/rerunChecks'

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
