
import React, {PropTypes} from 'react'
import R from 'ramda'

import {Block} from 'react-display'
import AnnotationEditor from '../AnnotationEditor'

const handleClick = props => {
  props.onUpdate({
    ...props,
    selectedIdx: undefined,
  })
}
const handleAnnotationEditorUpdate = (props, childProps) => {
  const annotation = props.annotationData[props.selectedIdx]
  const newAnnotation = {
    ...annotation,
    text: childProps.text,
    x: childProps.x,
    y: childProps.y,
  }
  const newAnnotationData = R.update(
    props.selectedIdx,
    newAnnotation,
    props.annotationData
  )
  props.onUpdate({
    ...props,
    annotationData: newAnnotationData,
  })
}

/*
Used inside <ChartRender/>

Shows the <AnnotationEditor/> for the selectedIdx of the annotationData.
Updates the annotationData accordingly to the changes on <AnnotationEditor/>
*/
const AnnotationEditorWrapper = props => {
  const annotation = props.annotationData[props.selectedIdx]
  if (!annotation) return <noscript/>
  return (
    <Block
      background='hsla(0, 0%, 25%, 0.2)'
      cursor='pointer'
      height={props.size.height}
      onMouseDown={handleClick.bind(null, props)}
      position='absolute'
      width={props.size.width}
      zIndex={999999}
    >
      <Block
        bottom={0}
        left={0}
        position='fixed'
        right={0}
        top={0}
      />
      <AnnotationEditor
        onUpdate={handleAnnotationEditorUpdate.bind(null, props)}
        size={props.size}
        text={annotation.text}
        x={annotation.x}
        y={annotation.y}
      />
    </Block>
  )
}

AnnotationEditorWrapper.propTypes = {
  annotationData: PropTypes.array,
  onUpdate: PropTypes.func,
  selectedIdx: PropTypes.number,
  size: PropTypes.object.isRequired,
}
AnnotationEditorWrapper.defaultProps = {
  annotationData: [],
}
AnnotationEditorWrapper.canUpdate = [
  'selectedIdx', 'annotationData',
]

export default AnnotationEditorWrapper
