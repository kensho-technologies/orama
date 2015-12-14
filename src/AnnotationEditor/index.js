
import React, {PropTypes} from 'react'
import {Block} from 'react-display'
import {DEFAULT_THEME} from '../defaultTheme'
import {stateHOC} from 'on-update'

import ContentEditable from '../ContentEditable'
import Draggable from '../Draggable'

const handleContentEditableUpdate = (props, childProps) => {
  props.onUpdate({
    ...props,
    text: childProps.text,
  })
}
const handleDraggableUpdate = (props, {deltaX, deltaY}) => {
  let x = props.x - deltaX
  if (x < 20) x = 20
  if (x > props.width) x = props.width
  let y = props.y - deltaY
  if (y < 20) y = 20
  if (y > props.height) y = props.height
  props.onUpdate({
    ...props,
    x,
    y,
  })
}

/*
Used inside <AnnotationEditorWrapper/>
*/
const AnnotationEditor = props => (
  <Block
    background='hsla(0, 0%, 100%, 1)'
    border='2px solid black'
    display='block'
    fontFamily={props.theme.fontFamily}
    fontSize={props.theme.fontSize}
    fontWeight='bold'
    left={props.x}
    maxWidth='200'
    padding={2}
    pointerEvents='fill'
    position='absolute'
    textAlign={props.textAlign}
    top={props.y}
  >
    <Draggable
      onUpdate={handleDraggableUpdate.bind(null, props)}
    >
      <Block
        background='hsl(187, 100%, 50%)'
        border='2px solid black'
        borderRadius={100}
        cursor='pointer'
        left='-19'
        padding={6}
        position='absolute'
        top='-19'
      />
    </Draggable>
    <ContentEditable
      onUpdate={handleContentEditableUpdate.bind(null, props)}
      text={props.text}
    />
    <Draggable
      onUpdate={handleDraggableUpdate.bind(null, props)}
    >
      <Block
        background='hsl(187, 100%, 50%)'
        border='2px solid black'
        borderRadius={100}
        bottom='-19'
        cursor='pointer'
        padding={6}
        position='absolute'
        right='-19'
      />
    </Draggable>
  </Block>
)

AnnotationEditor.propTypes = {
  height: PropTypes.number,
  onUpdate: PropTypes.func,
  size: PropTypes.object,
  text: PropTypes.string,
  textAlign: PropTypes.string,
  theme: PropTypes.object,
  width: PropTypes.number,
  x: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  y: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}
AnnotationEditor.defaultProps = {
  theme: DEFAULT_THEME,
}

export default stateHOC(AnnotationEditor)
