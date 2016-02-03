
import React, {PropTypes} from 'react'

import {TextBody} from '../../basics/TextBody'
import {H1, Code, P} from '../../basics'

export const ExampleLayout = props =>
  <TextBody>
    <H1 marginBottom={5}>{props.title}</H1>
    <P color='grey' fontSize={13}>
      {props.date && props.date.toDateString()}
    </P>
    {props.children}
    <P marginTop={15}>{props.description}</P>
    <Code>
      {props.imports}
      <br/><br/>
      {props.code}
    </Code>
  </TextBody>
ExampleLayout.propTypes = {
  children: PropTypes.node,
  code: PropTypes.string,
  date: PropTypes.instanceOf(Date),
  description: PropTypes.string,
  imports: PropTypes.string,
  title: PropTypes.string,
}
