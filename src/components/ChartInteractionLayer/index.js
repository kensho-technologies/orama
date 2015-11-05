
import React, {PropTypes} from 'react'
import R from 'ramda'
import defaultTheme from '../defaultTheme'
import stateHOC from '../../utils/stateHOC'

import {Block} from '@luiscarli/display'
import AnnotationEditorWrapper from '../AnnotationEditorWrapper'
import ContextMenuWrapper from '../ContextMenuWrapper'
import RenderAnnotation from '../RenderAnnotation'

const handleRenderAnnotation = (props, {clickedIdx}) => {
  props.onUpdate({
    ...props,
    hoverData: undefined,
  })
  props.onState({
    annotationSelectedIdx: clickedIdx,
  })
}
const handleAnnotationEditorWrapper = (props, childProps) => {
  props.onUpdate({
    ...props,
    annotationData: childProps.annotationData,
  })
  props.onState({
    annotationSelectedIdx: childProps.selectedIdx,
  })
}
const handleContextMenuWrapper = (props, childProps) => {
  if (childProps.selected === 'Add Label') {
    const annotationData = R.append({
      type: 'text',
      text: 'NEW',
      textAlign: 'left',
      x: props.lastLocalMousePos.x,
      y: props.lastLocalMousePos.y,
    }, props.annotationData)
    props.onUpdate({
      ...props,
      annotationData,
      dataClicked: undefined,
    })
    props.onState({
      annotationSelectedIdx: annotationData.length - 1,
    })
  } else if (childProps.selected === 'Highlight Data') {
    const highlightData = R.append(props.dataClicked, props.highlightData)
    props.onUpdate({
      ...props,
      highlightData,
      dataClicked: undefined,
    })
  } else {
    props.onUpdate({
      ...props,
      dataClicked: childProps.show,
    })
  }
}
/*
Used inside <ChartRenderWrapper/>
*/
const ChartInteractionLayer = props => (
  <Block>
    <RenderAnnotation
      annotationData={props.annotationData}
      onUpdate={handleRenderAnnotation.bind(null, props)}
      size={props.size}
      theme={props.theme}
    />
    <AnnotationEditorWrapper
      annotationData={props.annotationData}
      onUpdate={handleAnnotationEditorWrapper.bind(null, props)}
      selectedIdx={props.annotationSelectedIdx}
      size={props.size}
    />
    <ContextMenuWrapper
      items={['Highlight Data', 'Add Label']}
      onUpdate={handleContextMenuWrapper.bind(null, props)}
      position={props.lastMousePos}
      show={props.dataClicked ? true : false}
    />
  </Block>
)
ChartInteractionLayer.propTypes = {
  annotationData: PropTypes.array,
  annotationSelectedIdx: PropTypes.number, // state
  dataClicked: PropTypes.object,
  lastMousePos: PropTypes.object,
  onUpdate: PropTypes.func,
  showDataMenu: PropTypes.bool,
  size: PropTypes.object,
  theme: PropTypes.object,
}
ChartInteractionLayer.defaultProps = {
  theme: defaultTheme,
}

export default stateHOC(ChartInteractionLayer)
