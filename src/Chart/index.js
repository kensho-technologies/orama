
import React from 'react'
import _ from 'lodash'

import {DEFAULT_THEME} from '../defaultTheme'
import {PROPORTION} from '../Chart/defaults'
import {WIDTH} from '../Chart/defaults'

import {addLocalDimensionsToProps} from '../Chart/addDimArrays'
import {getLayers} from '../Chart/getLayers'
import {getMemoizeAddDimArrays} from '../Chart/memoize'
import {getMemoizeAddDomains} from '../Chart/memoize'
import {getMemoizeAddPlotRect} from '../Chart/memoize'
import {getMemoizeAddRanges} from '../Chart/memoize'
import {getMemoizeAddScales} from '../Chart/memoize'
import {getMemoizeAddTickCounts} from '../Chart/memoize'
import {getMemoizeAddTypes} from '../Chart/memoize'
import {getMemoizeForRenderLayers} from '../Chart/memoize'
import {getTheme} from '../defaultTheme'
import {PropTypes} from 'react'
import {removeDimArrays} from '../Chart/addDimArrays'
import {stateHOC} from 'on-update'
import {chartWidthHOC} from '../Chart/chartWidthHOC'

import {Block} from 'react-display'
import {ChartBackground} from '../ChartBackground'
import {basicRender} from '../CanvasRender/renders'
import {CanvasInput} from '../CanvasInput'
import {CanvasRender} from '../CanvasRender'

const PROPS_TO_OMIT = ['memoizers', 'onUpdate', 'onState', 'layerProps', 'chartProps']

const handleChartRender = (props, childProps) => {
  props.onUpdate({
    ...childProps,
  })
}

/*
Used inside </>
*/
export const _Chart = props => {
  const {
    memoizers,
  } = props
  const transformProps = _.flow(
    addLocalDimensionsToProps,
    memoizers.addDimArrays,
    memoizers.addTypes,
    memoizers.addDomains,
    memoizers.addPlotRect,
    memoizers.addRanges,
    memoizers.addTickCounts,
    memoizers.addScales,
    removeDimArrays,
    _props => _.omit(_props, PROPS_TO_OMIT),
  )
  const layers = getLayers(props)
  const rootProps = transformProps({
    layers,
    ...props,
    theme: getTheme(props.theme),
  })
  const renderLayers = memoizers.renderLayers(rootProps)
  return (
    <Block
      background={props.theme.backgroundFill}
      paddingBottom={`${rootProps.height / rootProps.width * 100}%`}
      position='relative'
      userSelect='none'
      width='100%'
    >
      <ChartBackground
        {...rootProps}
      />
      {_.map(
        renderLayers,
        (renderLayer, i) => (
          <CanvasRender // basicRender
            clip={true}
            height={rootProps.height}
            key={i}
            layerProps={renderLayer.layerProps}
            plotRect={rootProps.plotRect}
            render={basicRender}
            renderData={renderLayer.renderData}
            theme={props.theme}
            width={rootProps.width}
          />
        )
      )}
      <CanvasInput
        onUpdate={childProps => handleChartRender(props, childProps)}
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
    addDimArrays: getMemoizeAddDimArrays(),
    addTypes: getMemoizeAddTypes(),
    addDomains: getMemoizeAddDomains(),
    addPlotRect: getMemoizeAddPlotRect(),
    addRanges: getMemoizeAddRanges(),
    addTickCounts: getMemoizeAddTickCounts(),
    addScales: getMemoizeAddScales(),
    renderLayers: getMemoizeForRenderLayers(),
  },
})
export const StateChart = stateHOC(_Chart)
export const Chart = chartWidthHOC(StateChart)
