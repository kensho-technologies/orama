
import React, {PropTypes} from 'react'
import {DEFAULT_THEME} from '../defaultTheme'
import {stateHOC} from 'on-update'
import {Block} from 'react-display'
import {WIDTH, HEIGHT} from '../Chart/defaults'
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
      height={props.height}
      plotRect={props.plotRect}
      render={basicRender}
      renderLayers={props.renderLayers}
      theme={props.theme}
      width={props.width}
    />
    <CanvasRender // highlightRender
      clip={true}
      height={props.height}
      plotRect={props.plotRect}
      render={highlightRender}
      renderData={props.highlightData}
      theme={props.theme}
      width={props.width}
    />
    <CanvasRender // hoverRender
      clip={true}
      height={props.height}
      plotRect={props.plotRect}
      render={hoverRender}
      renderData={props.hoverRenderData}
      theme={props.theme}
      width={props.width}
    />
    <CanvasInput
      height={props.height}
      onUpdate={handleCanvasInput.bind(null, props)}
      renderLayers={props.renderLayers}
      theme={props.theme}
      width={props.width}
    />
  </Block>
)

ChartRender.propTypes = {
  height: PropTypes.number,
  highlightData: PropTypes.array,
  hoverRenderData: PropTypes.array,
  onUpdate: PropTypes.func,
  plotRect: PropTypes.object,
  renderLayers: PropTypes.array,
  theme: PropTypes.object,
  width: PropTypes.number,
}
ChartRender.defaultProps = {
  theme: DEFAULT_THEME,
  width: WIDTH,
  height: HEIGHT,
}

export default stateHOC(ChartRender)
