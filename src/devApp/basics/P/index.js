
import React, {PropTypes} from 'react'
import {Block} from 'react-display'

export const P = props => (
  <Block
    fontSize={15}
    lineHeight={1.5}
    marginBottom={15}
    whiteSpace='pre-wrap'
    {...props}
  />
)
P.propTypes = {
  children: PropTypes.node,
}
