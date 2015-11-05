
import React, {PropTypes} from 'react'
import defaultTheme from '../defaultTheme'
import stateHOC from '../../utils/stateHOC'

import {Block} from '@luiscarli/display'
import CanvasInput2 from '../CanvasInput2'
import CanvasRender from '../CanvasRender'
import CanvasRenderHighlight from '../CanvasRenderHighlight'
import CanvasRenderHover from '../CanvasRenderHover'

const handleCanvasInput2 = (props, childProps) => {
  props.onUpdate({
    ...props,
    hoverData: childProps.hoverData,
    mouse: childProps.mouse,
    localMouse: childProps.localMouse,
    dataClicked: childProps.dataClicked,
  })
}
/*
Used inside <ChartRenderWrapper/>
*/
const ChartRender = props => (
  <Block>
    <CanvasRender
      plotRect={props.plotRect}
      renderData={props.renderData}
      size={props.size}
      theme={props.theme}
    />
    <CanvasRenderHighlight
      highlightData={props.highlightData}
      plotRect={props.plotRect}
      size={props.size}
      theme={props.theme}
    />
    <CanvasRenderHover
      hoverData={[props.hoverData]}
      plotRect={props.plotRect}
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
  hoverData: PropTypes.object,
  onUpdate: PropTypes.func,
  plotRect: PropTypes.object,
  renderData: PropTypes.array,
  size: PropTypes.object.isRequired,
  theme: PropTypes.object,
}
ChartRender.defaultProps = {
  size: {width: 500, height: 500},
  annotationData: [],
  theme: defaultTheme,
}

export default stateHOC(ChartRender)
