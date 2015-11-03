
import React, {PropTypes} from 'react'
import R from 'ramda'

import {Block} from '@luiscarli/display'
import AnnotationEditorWrapper from '../AnnotationEditorWrapper'
import CanvasInput2 from '../CanvasInput2'
import CanvasRender from '../CanvasRender'
import CanvasRenderHighlight from '../CanvasRenderHighlight'
import CanvasRenderHover from '../CanvasRenderHover'
import ContextMenuWrapper from '../ContextMenuWrapper'
import RenderAnnotation from '../RenderAnnotation'

import defaultTheme from '../defaultTheme'
import stateHOC from '../../utils/stateHOC'
import utils from '../../utils'

const handleCanvasInput2Update = (props, childProps) => {
  if (childProps.dataHovered || childProps.dataHovered === null) {
    props.onUpdate({
      ...props,
      dataHovered: childProps.dataHovered,
    })
  } else {
    props.onUpdate({
      ...props,
      showDataMenu: childProps.dataClicked,
      lastMousePos: childProps.mouse,
      dataClicked: childProps.dataClicked,
    })
  }
}
const handleRenderAnnotationUpdate = (props, {clickedIdx}) => {
  props.onUpdate({
    ...props,
    annotationSelectedIdx: clickedIdx,
  })
}
const handleAnnotationEditorWrapperUpdate = (props, childProps) => {
  props.onUpdate({
    ...props,
    annotationSelectedIdx: childProps.selectedIdx,
    annotationData: childProps.annotationData,
  })
}
const handleContextMenuWrapperUpdate = (props, childProps) => {
  props.onUpdate({
    ...props,
    showDataMenu: childProps.show,
  })
}

const ChartRender = props => (
  <Block // canvas wrapper
    height={props.size.height}
    position={'relative'}
    width={props.size.width}
  >
    <CanvasRender
      plotRect={props.plotRect}
      renderData={props.renderData}
      size={props.size}
      theme={props.theme}
    />
    <CanvasRenderHighlight
      data={props.renderHighlightData}
      plotRect={props.plotRect}
      size={props.size}
      theme={props.theme}
    />
    <CanvasRenderHover
      plotRect={props.plotRect}
      renderHoverData={[props.dataHovered]}
      size={props.size}
      theme={props.theme}
    />
    <CanvasInput2
      onUpdate={handleCanvasInput2Update.bind(null, props)}
      renderData={props.renderData}
      size={props.size}
    />
    <RenderAnnotation
      annotationData={props.annotationData}
      onUpdate={handleRenderAnnotationUpdate.bind(null, props)}
      size={props.size}
      theme={props.theme}
    />
    <AnnotationEditorWrapper
      annotationData={props.annotationData}
      onUpdate={handleAnnotationEditorWrapperUpdate.bind(null, props)}
      selectedIdx={props.annotationSelectedIdx}
      size={props.size}
    />
    <ContextMenuWrapper
      onUpdate={handleContextMenuWrapperUpdate.bind(null, props)}
      position={props.lastMousePos}
      show={props.showDataMenu}
    />
  </Block>
)

ChartRender.propTypes = {
  annotationData: PropTypes.array,
  onUpdate: PropTypes.func,
  plotRect: PropTypes.object,
  renderData: PropTypes.array,
  renderHighlightData: PropTypes.array,
  renderHoverData: PropTypes.array,
  size: PropTypes.object,
  textData: PropTypes.array,
  theme: PropTypes.object,
}

ChartRender.defaultProps = {
  annotationData: [],
  theme: defaultTheme,
}

// defaultProps for test
const renderData = R.map(() => {
  const path2D = utils.path()
  path2D.arc(Math.random() * 350 + 50, Math.random() * 350 + 50, 5, 0, 2 * Math.PI)
  return {
    type: 'area',
    path2D,
  }
}, R.range(1, 500))
const annotationData = [
  {
    type: 'text',
    text: 'ANNOTATION1',
    textAlign: 'left',
    x: 200,
    y: 200,
  },
  {
    type: 'text',
    text: 'ANNOTATION2',
    textAlign: 'left',
    x: 200,
    y: 300,
  },
]
const defaultProps = {
  size: {width: 500, height: 500},
  plotRect: {x: 50, y: 50, width: 400, height: 400},
  renderData,
  annotationData,
}

export default stateHOC(ChartRender, defaultProps)
