
import React, {PropTypes} from 'react'
import {theme} from '../../theme'

import {Block, Row} from 'react-display'

/*
Used inside </>
*/
export const TextBody = props => (
  <Row
    justifyContent='center'
  >
    <Block
      flexBasis={theme.module * 2}
      margin='0 10px'
      {...props}
    >
      {props.children}
    </Block>
  </Row>
)
TextBody.propTypes = {
  children: PropTypes.node,
  onUpdate: PropTypes.func,
}
