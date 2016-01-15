
import {getDimArrays} from '../../Chart/getDimArrays'
import {getTypes} from '../../Chart/getForProps'
import {getDomains} from '../../Chart/getForProps'
import {getPlotRect} from '../../Chart/getPlotRect'
import {getRanges} from '../../Chart/getForProps'
import {getTickCounts} from '../../Chart/getForProps'
import {getScales} from '../../Chart/getForProps'
import {getLayer} from '../../Chart/getRenderLayers'
import {map} from 'lodash'
import {rerunCheckAddTypes} from '../../Chart/rerunChecks'
import {rerunCheckDimArrays} from '../../Chart/rerunChecks'
import {rerunCheckAddDomains} from '../../Chart/rerunChecks'
import {rerunCheckAddPlotRect} from '../../Chart/rerunChecks'
import {rerunCheckAddRanges} from '../../Chart/rerunChecks'
import {rerunCheckAddTickCounts} from '../../Chart/rerunChecks'
import {rerunCheckAddScales} from '../../Chart/rerunChecks'
import {rerunCheckRenderLayer} from '../../Chart/rerunChecks'

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

export const getMemoizeAddDimArrays = () => getMemoize(
  rerunCheckDimArrays, getDimArrays
)
export const getMemoizeAddTypes = () => getMemoize(
  rerunCheckAddTypes, getTypes
)
export const getMemoizeAddDomains = () => getMemoize(
  rerunCheckAddDomains, getDomains
)
export const getMemoizeAddPlotRect = () => getMemoize(
  rerunCheckAddPlotRect, getPlotRect
)
export const getMemoizeAddRanges = () => getMemoize(
  rerunCheckAddRanges, getRanges
)
export const getMemoizeAddTickCounts = () => getMemoize(
  rerunCheckAddTickCounts, getTickCounts
)
export const getMemoizeAddScales = () => getMemoize(
  rerunCheckAddScales, getScales
)
export const getMemoizeRenderLayer = () => getMemoize(
  rerunCheckRenderLayer, getLayer, true
)

export const getMemoizeForRenderLayers = () => {
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
