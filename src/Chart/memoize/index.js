
import {addDimArrays} from '../../Chart/addDimArrays'
import {addTypes} from '../../Chart/addMethods'
import {addDomains} from '../../Chart/addMethods'
import {addPlotRect} from '../../Chart/addPlotRect'
import {addRanges} from '../../Chart/addMethods'
import {addTickCounts} from '../../Chart/addMethods'
import {addScales} from '../../Chart/addMethods'
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

export const getMemoize = (rerunCheck, transformFunc) => {
  let savedResult
  let prevProps = {}
  const memoizer = props => {
    const rerun = rerunCheck(props, prevProps)
    prevProps = props
    if (rerun) {
      savedResult = transformFunc(props)
    }
    return savedResult || transformFunc(props)
  }
  return memoizer
}

export const getMemoizeAddDimArrays = () => getMemoize(
  rerunCheckDimArrays, addDimArrays
)
export const getMemoizeAddTypes = () => getMemoize(
  rerunCheckAddTypes, addTypes
)
export const getMemoizeAddDomains = () => getMemoize(
  rerunCheckAddDomains, addDomains
)
export const getMemoizeAddPlotRect = () => getMemoize(
  rerunCheckAddPlotRect, addPlotRect
)
export const getMemoizeAddRanges = () => getMemoize(
  rerunCheckAddRanges, addRanges
)
export const getMemoizeAddTickCounts = () => getMemoize(
  rerunCheckAddTickCounts, addTickCounts
)
export const getMemoizeAddScales = () => getMemoize(
  rerunCheckAddScales, addScales
)
export const getMemoizeRenderLayer = () => getMemoize(
  rerunCheckRenderLayer, getLayer
)

export const getMemoizeForRenderLayers = () => {
  const rootMemoize = getMemoizeRenderLayer()
  const layersMemoize = []
  // let prevLayers = []
  const memoizeForLayers = props => {
    const renderRoot = rootMemoize(props)
    // bail out of layers mapping, if they are the same
    // if (prevLayers === props.layers) {
    //   return props
    // }
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
    // prevLayers = props.layers
    return [
      renderRoot,
      ...renderLayers,
    ]
  }
  return memoizeForLayers
}
