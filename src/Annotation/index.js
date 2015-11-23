
import React, {PropTypes} from 'react'

import {Block} from '@luiscarli/display'

import stateHOC from '../utils/stateHOC'

const handleClick = props => {
  props.onUpdate({
    ...props,
    clicked: true,
  })
}
const handleMouseOut = props => {
  props.onState({
    stateHover: false,
  })
}
const handleMouseOver = props => {
  props.onState({
    stateHover: true,
  })
}
/*
Used inside <RenderAnnotation/>
*/
const Annotation = props => (
  <Block
    background='hsla(0, 0%, 100%, 0.6)'
    border={props.stateHover ? '2px solid black' : '2px solid transparent'}
    boxSizing='border-box'
    cursor='pointer'
    display='block'
    left={props.x}
    maxWidth='200'
    onClick={handleClick.bind(null, props)}
    onMouseOut={handleMouseOut.bind(null, props)}
    onMouseOver={handleMouseOver.bind(null, props)}
    padding={2}
    pointerEvents='fill'
    position='absolute'
    textAlign={props.textAlign}
    top={props.y}
  >
    {props.text}
  </Block>
)

Annotation.propTypes = {
  stateHover: PropTypes.bool,
  text: PropTypes.string,
  textAlign: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
}
Annotation.updateOnlyTypes = {
  clicked: PropTypes.bool,
}
Annotation.canUpdate = [
  'clicked',
]

export default stateHOC(Annotation, {stateHover: false})
