/* eslint react/prop-types: 0 */

import React, {PropTypes} from 'react'

import {TextBody} from '../../basics/TextBody'
import {Block, Row} from 'react-display'
import {H1, H2, Code, P} from '../../basics'
import {getHtmlCode} from '../getHtmlCode'

const handleSwitchBtn = props =>
  props.setState({codeStyle: props.children})

const SwitchBtn = props =>
  <Block
    backgroundColor={props.codeStyle ? 'hsl(201, 35%, 45%)' : 'white'}
    border='2px solid hsl(201, 35%, 45%)'
    color={props.codeStyle ? 'white' : 'hsl(201, 35%, 45%)'}
    cursor='pointer'
    onClick={() => handleSwitchBtn(props)}
    padding='2px 4px'
    {...props}
  />

const Switcher = props =>
  <Row
    fontSize={13}
  >
    <SwitchBtn {...props} codeStyle={props.codeStyle === 'Bundler'}>Bundler</SwitchBtn>
    <SwitchBtn {...props} codeStyle={props.codeStyle === 'Html'}>Html</SwitchBtn>
  </Row>

const ExampleCode = props => {
  if (props.codeStyle === 'Bundler') {
    return (
      <Code marginTop={0}>
        {props.code.split('export code from \'!!raw!./\'')[1].trim()}
      </Code>
    )
  }
  return (
    <Code marginTop={0}>
      {getHtmlCode(props.code.split('export code from \'!!raw!./\'')[1].trim())}
    </Code>
  )
}

export const ExampleLayout = props =>
  <TextBody>
    <H1 marginBottom={5}>{props.title}</H1>
    <P color='grey' fontSize={13}>
      {props.date && props.date.toDateString()}
    </P>
    {props.children}
    {props.description ? <H2>Description</H2> : null}
    <P marginBottom={25} marginTop={0}>{props.description}</P>
    {props.code ? <Row flex={1} justifyContent='flex-end'><Switcher {...props}/></Row> : null}
    {props.code ? <ExampleCode {...props}/> : null}
  </TextBody>

ExampleLayout.propTypes = {
  children: PropTypes.node,
  code: PropTypes.string,
  date: PropTypes.instanceOf(Date),
  description: PropTypes.string,
  imports: PropTypes.string,
  title: PropTypes.string,
}
