
import React, {PropTypes} from 'react'
import _ from 'lodash'
import {stateHOC} from 'on-update'
import {Inline} from 'react-display'
import {theme} from '../../theme'

const handleMouseEnter = props => {
  props.onState({hover: true})
}
const handleMouseLeave = props => {
  props.onState({hover: false})
}
const handleMouseDown = props => {
  props.onState({active: true})
}
const handleMouseUp = props => {
  props.onState({active: false})
}
const handleClick = props => {
  if (props.href) window.open(props.href)
}

const getBackground = props => {
  if (props.active) return 'hsl(201, 78%, 85%'
  if (props.hover) return 'hsl(201, 78%, 95%'
  return undefined
}

const getBoxShadow = props => (
  `0 ${props.strokeWidth}px hsla(201, 78%, 28%, ${props.strokeAlpha})`
)

export const _A = props => (
  <Inline
    backgroundColor={getBackground(props)}
    boxShadow={getBoxShadow(props)}
    color={theme.accentColor}
    cursor='pointer'
    onClick={_.partial(handleClick, props)}
    onMouseDown={_.partial(handleMouseDown, props)}
    onMouseEnter={_.partial(handleMouseEnter, props)}
    onMouseLeave={_.partial(handleMouseLeave, props)}
    onMouseUp={_.partial(handleMouseUp, props)}
    {..._.omit(props, ['onUpdate', 'onState'])}
  />
)
_A.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  hover: PropTypes.bool,
  strokeWidth: PropTypes.number,
}
_A.defaultProps = {
  strokeWidth: 2,
  strokeAlpha: 0.1,
}

export const A = stateHOC(_A)
