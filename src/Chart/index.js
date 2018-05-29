// Copyright 2018 Kensho Technologies, LLC.

import * as React from 'react'
import PropTypes from 'prop-types'

import DEFAULT_THEME from '../defaultTheme'
import {PROPORTION, WIDTH} from '../chartCore/defaults'
import chartTransformFlow from '../chartCore/chartTransformFlow'
import getLayers from '../chartCore/getLayers'
import getLocalKeys from '../chartCore/getLocalKeys'
import stateHOC from '../utils/stateHOC'
import CanvasInput from '../CanvasInput'
import ChartBackground from '../ChartBackground'
import {
  getMemoizeDimArrays,
  getMemoizeDomains,
  getMemoizePlotRect,
  getMemoizeRanges,
  getMemoizeRenderLayers,
  getMemoizeScales,
  getMemoizeTickCounts,
  getMemoizeTypes,
} from '../chartCore/memoize'

import chartWidthHOC from './chartWidthHOC'
import ChartRender from './ChartRender'

function getTheme(props) {
  const theme = {...DEFAULT_THEME, ...props.theme}
  return {theme}
}

function handleCanvasInput(props, childProps) {
  props.onUpdate(childProps)
}

function StatelessChart(props) {
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

StatelessChart.propTypes = {
  memoizers: PropTypes.object,
  onUpdate: PropTypes.func,
  proportion: PropTypes.number,
  theme: PropTypes.object,
  width: PropTypes.number,
}

StatelessChart.defaultProps = {
  proportion: PROPORTION,
  theme: DEFAULT_THEME,
  width: WIDTH,
}

StatelessChart.initialState = () => ({
  memoizers: {
    getDimArrays: getMemoizeDimArrays(),
    getTypes: getMemoizeTypes(),
    getDomains: getMemoizeDomains(),
    getPlotRect: getMemoizePlotRect(),
    getRanges: getMemoizeRanges(),
    getTickCounts: getMemoizeTickCounts(),
    getScales: getMemoizeScales(),
    getRenderLayers: getMemoizeRenderLayers(),
  },
})

export const Chart = stateHOC(StatelessChart)
export default chartWidthHOC(Chart)
