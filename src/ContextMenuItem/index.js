
import React, {PropTypes} from 'react'

import {Block} from 'react-display'

import {stateHOC} from 'on-update'
import defaultTheme from '../defaultTheme'

const handleMouseEnter = props => {
  props.onState({mouseHover: true, mouseDown: false})
}
const handleMouseLeave = props => {
  props.onState({mouseHover: false, mouseDown: false})
}
const handleMouseDown = (props, evt) => {
  evt.stopPropagation()
  props.onState({mouseDown: true})
}
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

/*
Used inside <ContextMenu/>
Works as the menu buttom for the <ContextMenu/>
*/
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
ContextMenuItem.defaultProps = {
  theme: defaultTheme,
}

export default stateHOC(ContextMenuItem)
