
import React, {PropTypes} from 'react'
import {Block} from 'react-display'
import {theme} from '../../theme'

export const H1 = props => (
  <Block
    color={theme.accentColor}
    fontSize={16 * 1.4}
    fontWeight='bold'
    marginBottom={16}
    marginTop={16 * 1.4}
    {...props}
  />
)
H1.propTypes = {
  children: PropTypes.node,
}
