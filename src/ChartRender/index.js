
import React, {PropTypes} from 'react'
import {DEFAULT_THEME} from '../defaultTheme'
import {stateHOC} from 'on-update'
import {Block} from 'react-display'
import {SIZE} from '../Chart2/defaults'
import {
  basicRender,
  highlightRender,
  hoverRender,
} from '../CanvasRender/renders'

import CanvasInput2 from '../CanvasInput2'
import CanvasRender from '../CanvasRender'

const handleCanvasInput2 = (props, childProps) => {
  props.onUpdate({
    ...props,
    dataClicked: childProps.dataClicked,
    hoverData: [childProps.hoverDatum],
    hoverDatum: childProps.hoverDatum,
    localMouse: childProps.localMouse,
    mouse: childProps.mouse,
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
      renderData={props.renderData}
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
    <CanvasInput2
      onUpdate={handleCanvasInput2.bind(null, props)}
      renderData={props.renderData}
      size={props.size}
    />
  </Block>
)

ChartRender.propTypes = {
  highlightData: PropTypes.array,
  hoverData: PropTypes.array,
  onUpdate: PropTypes.func,
  plotRect: PropTypes.object,
  renderData: PropTypes.array,
  size: PropTypes.object.isRequired,
  theme: PropTypes.object,
}
ChartRender.defaultProps = {
  size: SIZE,
  annotationData: [],
  theme: DEFAULT_THEME,
}

export default stateHOC(ChartRender)
