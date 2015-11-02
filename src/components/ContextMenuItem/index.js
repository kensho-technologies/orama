
import React, {PropTypes} from 'react'

import {Block} from '@luiscarli/display'

import stateHOC from '../../utils/stateHOC'
import defaultTheme from '../defaultTheme'

const handleMouseEnter = props => props.onState({mouseHover: true})
const handleMouseLeave = props => props.onState({mouseHover: false})

const handleMouseDown = props => props.onState({mouseDown: true})
const handleMouseUp = props => props.onState({mouseDown: false})

const handleClick = props => {
  props.onUpdate({
    ...props,
    clicked: true,
  })
}

const getBackground = props => {
  if (props.mouseDown) return 'hsl(0, 0%, 40%)'
  if (props.mouseHover) return 'hsl(0, 0%, 50%)'
  return 'none'
}

const getColor = props => {
  if (props.mouseHover || props.mouseDown) return 'hsl(0, 0%, 92%)'
  return 'black'
}

const ContextMenuItem = props => (
  <Block
    background={getBackground(props)}
    color={getColor(props)}
    cursor='pointer'
    onClick={handleClick.bind(null, props)}
    onMouseDown={handleMouseDown.bind(null, props)}
    onMouseEnter={handleMouseEnter.bind(null, props)}
    onMouseLeave={handleMouseLeave.bind(null, props)}
    onMouseUp={handleMouseUp.bind(null, props)}
    padding='1px 15px'
    userSelect='none'
  >
    {props.text}
  </Block>
)
ContextMenuItem.propTypes = {
  onState: PropTypes.func,
  onUpdate: PropTypes.func.isRequired,
  text: PropTypes.string,
  theme: PropTypes.object,
}
ContextMenuItem.updateOnlyTypes = {
  clicked: PropTypes.bool,
}
ContextMenuItem.canUpdate = [
  'clicked',
]
ContextMenuItem.defaultProps = {
  theme: defaultTheme,
}

export default stateHOC(ContextMenuItem)
