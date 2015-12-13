
import React, {PropTypes} from 'react'
import {DEFAULT_THEME} from '../defaultTheme'
import {stateHOC} from 'on-update'
import {Block} from 'react-display'
import {SIZE} from '../Chart/defaults'
import {
  basicRender,
  highlightRender,
  hoverRender,
} from '../CanvasRender/renders'

import {CanvasInput} from '../CanvasInput'
import {CanvasRender} from '../CanvasRender'

const handleCanvasInput = (props, childProps) => {
  props.onState({
    // dataClicked: childProps.dataClicked,
    hoverRenderData: childProps.hoverRenderData,
    // tooltipData: childProps.tooltipData,
    // localMouse: childProps.localMouse,
    // mouse: childProps.mouse,
  })
}
/*
Used inside <ChartRenderWrapper/>
*/
const ChartRender = props => (
  <Block>
    <CanvasRender // basicRender
      clip={true}
      plotRect={props.plotRect}
      render={basicRender}
      renderLayers={props.renderLayers}
      size={props.size}
      theme={props.theme}
    />
    <CanvasRender // highlightRender
      clip={true}
      plotRect={props.plotRect}
      render={highlightRender}
      renderData={props.highlightData}
      size={props.size}
      theme={props.theme}
    />
    <CanvasRender // hoverRender
      clip={true}
      plotRect={props.plotRect}
      render={hoverRender}
      renderData={props.hoverRenderData}
      size={props.size}
      theme={props.theme}
    />
    <CanvasInput
      onUpdate={handleCanvasInput.bind(null, props)}
      renderLayers={props.renderLayers}
      size={props.size}
      theme={props.theme}
    />
  </Block>
)

ChartRender.propTypes = {
  highlightData: PropTypes.array,
  hoverRenderData: PropTypes.array,
  onUpdate: PropTypes.func,
  plotRect: PropTypes.object,
  renderLayers: PropTypes.array,
  size: PropTypes.object.isRequired,
  theme: PropTypes.object,
}
ChartRender.defaultProps = {
  size: SIZE,
  theme: DEFAULT_THEME,
}

export default stateHOC(ChartRender)
