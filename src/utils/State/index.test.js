// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'
import * as React from 'react'
import {isFunction} from 'lodash'

import shallowRender from '../shallowRender'

import State from '.'

const TestClass = () => <div />

test('State 1', () => {
  const component = shallowRender(
    <State>
      <TestClass />
    </State>
  )
  assert(isFunction(component.props.onUpdate))
  assert(isFunction(component.props.setState))
})

test('State 2', () => {
  function startWith(props) {
    props.setState({test: true})
  }
  const component = shallowRender(
    <State startWith={startWith}>
      <TestClass />
    </State>
  )
  assert(component.props.test)
})
