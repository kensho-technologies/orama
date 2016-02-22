
import React, {PropTypes} from 'react'
import {theme} from '../../theme'
import {TextBody} from '../../basics/TextBody'
import {Block, Row} from 'react-display'
import {A} from '../../basics'
/*
Used inside </>
*/
export const Footer = () => (
  <TextBody
    marginBottom={20}
    marginTop={20}
  >
    <Row
      color={theme.accentColor}
    >
      <Block
        fontSize={theme.fontSize * 0.85}
      >
        ©2015 <A href='http://luiscarli.com'>Luis Carli</A>
      </Block>
    </Row>
  </TextBody>
)
Footer.propTypes = {
  theme: PropTypes.object,
}
Footer.defaultProps = {
  theme,
}
