
import React, {PropTypes} from 'react'

import {Block} from '@luiscarli/display'

import stateHOC from '../../utils/stateHOC'

const handleMouseEnter = (props) => {
  props.onState('hover', true)
}

const handleMouseLeave = (props) => {
  props.onState('hover', false)
}

const Annotation = (props) => (
  <Block
    background='hsla(0, 0%, 100%, 0.6)'
    border={props.hover ? '2px solid black' : '2px solid transparent'}
    boxSizing='border-box'
    cursor='pointer'
    display='block'
    left={props.x}
    maxWidth='200'
    // onClick={props.onClick.bind(null, props)}
    onMouseOut={handleMouseLeave.bind(null, props)}
    onMouseOver={handleMouseEnter.bind(null, props)}
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
  hover: PropTypes.bool,
  onClick: PropTypes.func,
  text: PropTypes.string,
  textAlign: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
}

export default stateHOC(Annotation, {hover: false})
