
import React, {PropTypes} from 'react'

import {Block} from '@luiscarli/display'
import ContentEditable from '../ContentEditable'
import Draggable from '../Draggable'

import defaultTheme from '../defaultTheme'
import stateHOC from '../../utils/stateHOC'

const handleContentEditableUpdate = (props, name, value) => {
  if (name !== 'text') return
  props.onUpdate('text', value)
}

const handleDraggableChange = (props, delta) => {
  let x = props.x - delta.x
  if (x < 20) x = 20
  if (x > props.size.width) x = props.size.width
  props.onUpdate('x', x)

  let y = props.y - delta.y
  if (y < 20) y = 20
  if (y > props.size.height) y = props.size.height
  props.onUpdate('y', y)
}

const AnnotationEditor = props => (
  <Block
    background='hsla(0, 0%, 100%, 1)'
    border='2px solid black'
    display='block'
    fontFamily={props.theme.font}
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
      onChange={handleDraggableChange.bind(null, props)}
    >
      <Block
        background='steelblue'
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
      onChange={handleDraggableChange.bind(null, props)}
    >
      <Block
        background='steelblue'
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
  onUpdate: PropTypes.func,
  text: PropTypes.string,
  x: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  y: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

AnnotationEditor.defaultProps = {
  size: {width: 500, height: 500},
  theme: defaultTheme,
}

export default stateHOC(AnnotationEditor)
