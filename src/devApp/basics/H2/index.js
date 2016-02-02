
import React, {PropTypes} from 'react'
import {Block} from 'react-display'
import {theme} from '../../theme'

export const H2 = props => (
  <Block
    color={theme.accentColor}
    fontSize={16 * 1}
    fontWeight='bold'
    marginBottom={16}
    marginTop={16 * 1}
    {...props}
  />
)
H2.propTypes = {
  children: PropTypes.node,
}
