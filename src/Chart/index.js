// Copyright 2018 Kensho Technologies, LLC.

import * as React from 'react'
import PropTypes from 'prop-types'

import {DEFAULT_THEME} from '../defaultTheme'
import {PROPORTION} from '../chartCore/defaults'
import {WIDTH} from '../chartCore/defaults'
import {chartTransformFlow} from '../chartCore/chartTransformFlow'
import {getLayers} from '../chartCore/getLayers'
import {getLocalKeys} from '../chartCore/getLocalKeys'
import {getTheme} from '../defaultTheme'
import stateHOC from '../utils/stateHOC'
import * as memoize from '../chartCore/memoize'
import {CanvasInput} from '../CanvasInput'
import {ChartBackground} from '../ChartBackground'

import {chartWidthHOC} from './chartWidthHOC'
import {ChartRender} from './ChartRender'

const handleCanvasInput = (props, childProps) => {
  props.onUpdate(childProps)
}

export const _Chart = props => {
  const {memoizers} = props
  const rootProps = chartTransformFlow(
    props,
    getTheme,
    getLayers,
    getLocalKeys,
    memoizers.getDimArrays,
    memoizers.getTypes,
    memoizers.getDomains,
    memoizers.getPlotRect,
    memoizers.getRanges,
    memoizers.getTickCounts,
    memoizers.getScales
  )
  const renderLayers = memoizers.getRenderLayers(rootProps)
  return (
    <div
      style={{
        background: props.theme.backgroundFill,
        height: rootProps.height,
        position: 'relative',
        userSelect: 'none',
        width: '100%',
      }}
    >
      <ChartBackground {...rootProps} />
      <ChartRender renderLayers={renderLayers} rootProps={rootProps} theme={rootProps.theme} />
      <CanvasInput
        onUpdate={childProps => handleCanvasInput(props, childProps)}
        renderLayers={renderLayers}
        rootProps={rootProps}
        theme={rootProps.theme}
      />
    </div>
  )
}
_Chart.propTypes = {
  memoizers: PropTypes.object,
  onUpdate: PropTypes.func,
  theme: PropTypes.object,
}
_Chart.defaultProps = {
  proportion: PROPORTION,
  theme: DEFAULT_THEME,
  width: WIDTH,
}
_Chart.initialState = () => ({
  memoizers: {
    getDimArrays: memoize.getMemoizeDimArrays(),
    getTypes: memoize.getMemoizeTypes(),
    getDomains: memoize.getMemoizeDomains(),
    getPlotRect: memoize.getMemoizePlotRect(),
    getRanges: memoize.getMemoizeRanges(),
    getTickCounts: memoize.getMemoizeTickCounts(),
    getScales: memoize.getMemoizeScales(),
    getRenderLayers: memoize.getMemoizeRenderLayers(),
  },
})
export const StateChart = stateHOC(_Chart)
export const Chart = chartWidthHOC(StateChart)
