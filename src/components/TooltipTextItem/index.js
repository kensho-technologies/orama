
import React, {PropTypes} from 'react'

import {Block} from '@luiscarli/display'
import ContentEditable from '../ContentEditable'
import Draggable from '../Draggable'

import defaultTheme from '../defaultTheme'
import stateHOC from '../../utils/stateHOC'

const handleContentEditableUpdate = (props, childProps) => {
  props.onUpdate({
    ...props,
    text: childProps.text,
  })
}

const handleDraggableChange = (props, delta) => {
  let x = props.x - delta.x
  if (x < 20) x = 20
  if (x > props.size.width) x = props.size.width
  let y = props.y - delta.y
  if (y < 20) y = 20
  if (y > props.size.height) y = props.size.height
  props.onUpdate({
    ...props,
    x,
    y,
  }, 'x', 'y')
}

const TooltipTextItem = props => (
  <Block
    background='hsla(0, 0%, 97%, 0.6)'
    border='2px solid transparent'
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
        background='hsla(0, 0%, 85%, 0.9)'
        cursor='pointer'
        left='-20'
        padding={4}
        position='absolute'
        top='-20'
      >
        x
      </Block>
    </Draggable>
    <ContentEditable
      onUpdate={handleContentEditableUpdate.bind(null, props)}
      text={props.text}
    />
    <Draggable
      onChange={handleDraggableChange.bind(null, props)}
    >
      <Block
        background='hsla(0, 0%, 85%, 0.9)'
        cursor='pointer'
        padding={4}
        position='absolute'
        right='-20'
        top='-20'
      >
        ↔
      </Block>
    </Draggable>
  </Block>
)

TooltipTextItem.propTypes = {
  onUpdate: PropTypes.func,
  text: PropTypes.string,
  x: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  y: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

TooltipTextItem.defaultProps = {
  size: {width: 500, height: 500},
  theme: defaultTheme,
}

export default stateHOC(TooltipTextItem)
