
import React, {PropTypes} from 'react'
import {DEFAULT_THEME} from '../defaultTheme'
import {stateHOC} from 'on-update'

import {Block} from 'react-display'
import ChartInteractionLayer from '../ChartInteractionLayer'
import ChartRender from '../ChartRender'

const handleChartRender = (props, childProps) => {
  props.onState({
    hoverData: childProps.hoverData,
    tooltipData: childProps.tooltipData,
    dataClicked: childProps.dataClicked,
    lastMousePos: childProps.mouse,
    lastLocalMousePos: childProps.localMouse,
  })
}
const handleChartInteractionLayer = (props, childProps) => {
  props.onState({
    hoverData: childProps.hoverData,
  })
  props.onUpdate({
    ...props,
    ...childProps,
  })
}
/*
Used inside </>
*/
const ChartRenderWrapper = props => (
  <Block
    height={props.height}
    position={'relative'}
    width={props.width}
  >
    <ChartRender
      height={props.height}
      highlightData={props.highlightData}
      hoverData={props.hoverData}
      onUpdate={handleChartRender.bind(null, props)}
      plotRect={props.plotRect}
      renderLayers={props.renderLayers}
      theme={props.theme}
      width={props.width}
    />
    <ChartInteractionLayer
      annotationData={props.annotationData}
      dataClicked={props.dataClicked}
      height={props.height}
      highlightData={props.highlightData}
      lastLocalMousePos={props.lastLocalMousePos}
      lastMousePos={props.lastMousePos}
      onUpdate={handleChartInteractionLayer.bind(null, props)}
      theme={props.theme}
      width={props.width}
    />
  </Block>
)
ChartRenderWrapper.propTypes = {
  annotationData: PropTypes.array,
  dataClicked: PropTypes.object,
  height: PropTypes.number,
  highlightData: PropTypes.array,
  hoverData: PropTypes.array, // state
  lastLocalMousePos: PropTypes.object, // state
  lastMousePos: PropTypes.object, // state
  onUpdate: PropTypes.func,
  plotRect: PropTypes.object,
  renderLayers: PropTypes.array,
  theme: PropTypes.object,
  tooltipData: PropTypes.object, // state
  width: PropTypes.number,
}
ChartRenderWrapper.defaultProps = {
  theme: DEFAULT_THEME,
}

export default stateHOC(ChartRenderWrapper)
