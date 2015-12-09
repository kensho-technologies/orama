
import React, {PropTypes} from 'react'
import _ from 'lodash'
import {DEFAULT_THEME} from '../defaultTheme'
import {stateHOC} from 'on-update'
import {Block} from 'react-display'
import {SIZE} from '../Chart/defaults'
import {
  basicRender,
  highlightRender,
  hoverRender,
} from '../CanvasRender/renders'

import CanvasInput from '../CanvasInput'
import {CanvasRender} from '../CanvasRender'

const handleCanvasInput = (props, childProps) => {
  props.onUpdate({
    ...props,
    dataClicked: childProps.dataClicked,
    hoverData: childProps.hoverData,
    tooltipData: childProps.tooltipData,
    localMouse: childProps.localMouse,
    mouse: childProps.mouse,
  })
}
const extractRenderDataFromLayers = renderLayers => _.flatten(_.pluck(renderLayers, 'renderData'))
/*
Used inside <ChartRenderWrapper/>
*/
const ChartRender = props => (
  <Block>
    <CanvasRender // basicRender
      clip={true}
      plotRect={props.plotRect}
      render={basicRender}
      renderData={extractRenderDataFromLayers(props.renderLayers)}
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
      renderData={props.hoverData}
      size={props.size}
      theme={props.theme}
    />
    <CanvasInput
      onUpdate={handleCanvasInput.bind(null, props)}
      renderLayers={props.renderLayers}
      size={props.size}
    />
  </Block>
)

ChartRender.propTypes = {
  highlightData: PropTypes.array,
  hoverData: PropTypes.array,
  onUpdate: PropTypes.func,
  plotRect: PropTypes.object,
  renderLayers: PropTypes.array,
  size: PropTypes.object.isRequired,
  theme: PropTypes.object,
}
ChartRender.defaultProps = {
  size: SIZE,
  annotationData: [],
  theme: DEFAULT_THEME,
}

export default stateHOC(ChartRender)
