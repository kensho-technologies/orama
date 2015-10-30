
import React, {PropTypes} from 'react'
import R from 'ramda'

import {Block} from '@luiscarli/display'
import AnnotationEditor from '../AnnotationEditor'

const handleClick = props => props.onUpdate({selectedIdx: -1})

const handleAnnotationEditorUpdate = (props, childProps) => {
  const annotation = props.annotationData[props.selectedIdx]
  const newAnnotation = {
    ...annotation,
    ...childProps,
  }
  const newAnnotationData = R.update(
    props.selectedIdx,
    newAnnotation,
    props.annotationData
  )
  props.onUpdate({annotationData: newAnnotationData})
}

/*
Used inside <ChartRender/>
can update: annotationData, selectedIdx

Shows the <AnnotationEditor/> for the selectedIdx of the annotationData.
Updates the annotationData accordingly to the changes on <AnnotationEditor/>
*/
const AnnotationEditorWrapper = props => {
  const annotation = props.annotationData[props.selectedIdx]
  if (!annotation) return <noscript/>
  return (
    <Block
      background='hsla(0, 0%, 25%, 0.6)'
      cursor='pointer'
      height={props.size.height}
      onMouseDown={handleClick.bind(null, props)}
      position='absolute'
      width={props.size.width}
    >
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

export default AnnotationEditorWrapper
