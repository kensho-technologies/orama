
import React from 'react'

import {DEFAULT_THEME} from '../defaultTheme'
import {PROPORTION} from '../Chart/defaults'
import {WIDTH} from '../Chart/defaults'

import {chartTransformFlow} from '../Chart/chartTransformFlow'
import {chartWidthHOC} from '../Chart/chartWidthHOC'
import {getLayers} from '../Chart/getLayers'
import {getLocalKeys} from '../Chart/getLocalKeys'
import {getTheme} from '../defaultTheme'
import {PropTypes} from 'react'
import {stateHOC} from 'on-update'
import * as memoize from '../Chart/memoize'

import {Block} from 'react-display'
import {CanvasInput} from '../CanvasInput'
import {ChartBackground} from '../ChartBackground'
import {ChartRender} from '../ChartRender'

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
    memoizers.getScales,
  )
  const renderLayers = memoizers.getRenderLayers(rootProps)
  return (
    <Block
      background={props.theme.backgroundFill}
      height={rootProps.height}
      position='relative'
      userSelect='none'
      width='100%'
    >
      <ChartBackground
        {...rootProps}
      />
      <ChartRender
        renderLayers={renderLayers}
        rootProps={rootProps}
        theme={props.theme}
      />
      <CanvasInput
        onUpdate={childProps => handleCanvasInput(props, childProps)}
        renderLayers={renderLayers}
        rootProps={rootProps}
        theme={props.theme}
      />
    </Block>
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
