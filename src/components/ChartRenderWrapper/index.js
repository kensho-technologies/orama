
import React, {PropTypes} from 'react'
import defaultTheme from '../defaultTheme'
import stateHOC from '../../utils/stateHOC'

import {Block} from '@luiscarli/display'
import ChartInteractionLayer from '../ChartInteractionLayer'
import ChartRender from '../ChartRender'

const handleChartRender = (props, childProps) => {
  props.onState({
    hoverData: childProps.hoverData,
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
    height={props.size.height}
    position={'relative'}
    width={props.size.width}
  >
    <ChartRender
      highlightData={props.highlightData}
      hoverData={props.hoverData}
      onUpdate={handleChartRender.bind(null, props)}
      plotRect={props.plotRect}
      renderData={props.renderData}
      size={props.size}
    />
    <ChartInteractionLayer
      annotationData={props.annotationData}
      dataClicked={props.dataClicked}
      highlightData={props.highlightData}
      lastLocalMousePos={props.lastLocalMousePos}
      lastMousePos={props.lastMousePos}
      onUpdate={handleChartInteractionLayer.bind(null, props)}
      size={props.size}
    />
  </Block>
)
ChartRenderWrapper.propTypes = {
  annotationData: PropTypes.array,
  dataClicked: PropTypes.object,
  highlightData: PropTypes.array,
  hoverData: PropTypes.array, // state
  lastLocalMousePos: PropTypes.object, // state
  lastMousePos: PropTypes.object, // state
  onUpdate: PropTypes.func,
  plotRect: PropTypes.object,
  renderData: PropTypes.array,
  size: PropTypes.object,
  theme: PropTypes.object,
}
ChartRenderWrapper.defaultProps = {
  theme: defaultTheme,
}

export default stateHOC(ChartRenderWrapper)
