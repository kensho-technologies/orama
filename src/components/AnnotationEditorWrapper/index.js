
import React, {PropTypes} from 'react'

import AnnotationEditor from '../AnnotationEditor'

const AnnotationEditorWrapper = props => {
  const annotation = props.annotationData[props.selectedIdx]
  if (!annotation) return <noscript/>
  return (
    <AnnotationEditor
      size={props.size}
      text={annotation.text}
      x={annotation.x}
      y={annotation.y}
    />
  )
}

AnnotationEditorWrapper.propTypes = {
  annotationData: PropTypes.array,
  onUpdate: PropTypes.func,
  selectedIdx: PropTypes.number,
  size: PropTypes.object,
}

AnnotationEditorWrapper.defaultProps = {
  annotationData: [],
}

export default AnnotationEditorWrapper
