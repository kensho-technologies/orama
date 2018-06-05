// Copyright 2018 Kensho Technologies, LLC.

import * as React from 'react'
import PropTypes from 'prop-types'

import DEFAULT_THEME from '../defaultTheme'
import {PROPORTION, WIDTH} from '../chartCore/defaults'
import chartTransformFlow from '../chartCore/chartTransformFlow'
import getLayers from '../chartCore/getLayers'
import getLocalKeys from '../chartCore/getLocalKeys'
import withComputedWidth from '../enhancers/withComputedWidth'
import withControlledState from '../enhancers/withControlledState'
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

import ChartRender from './ChartRender'

function getTheme(props) {
  const theme = {...DEFAULT_THEME, ...props.theme}
  return {theme}
}

function handleCanvasInput(props, childProps) {
  props.onUpdate(childProps)
}

function Chart(props) {
  const {memoizers, theme} = props
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
  const style = {
    background: theme.backgroundFill,
    height: rootProps.height,
    position: 'relative',
    userSelect: 'none',
    width: '100%',
  }
  return (
    <div style={style}>
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

Chart.propTypes = {
  memoizers: PropTypes.object,
  onUpdate: PropTypes.func,
  proportion: PropTypes.number,
  theme: PropTypes.object,
  width: PropTypes.number,
}

Chart.defaultProps = {
  proportion: PROPORTION,
  theme: DEFAULT_THEME,
  width: WIDTH,
}

const ControlledChart = withControlledState(Chart, () => ({
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
}))

export default withComputedWidth(ControlledChart)
