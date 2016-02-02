
import React, {PropTypes} from 'react'
import {Block} from 'react-display'
import {theme} from '../../theme'

export const Code = props => (
  <Block
    color='hsl(201, 78%, 28%)'
    flex={1}
    fontFamily={theme.fontFamilyMono}
    fontSize={16}
    lineHeight={1}
    marginBottom={16 * 1.4}
    marginTop={16 * 1.4}
    whiteSpace='pre-wrap'
    {...props}
  />
)
Code.propTypes = {
  children: PropTypes.node,
}
