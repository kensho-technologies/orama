
import React, {PropTypes} from 'react'
import {Block} from 'react-display'

export const P = props => (
  <Block
    fontSize={15}
    lineHeight={1.5}
    marginBottom={15}
    {...props}
  />
)
P.propTypes = {
  children: PropTypes.node,
}
