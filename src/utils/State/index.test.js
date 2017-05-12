// Copyright 2017 Kensho Technologies, Inc.

import {it as test} from 'mocha'
import assert from 'assert'

import React from 'react'
import _ from 'lodash'
import shallowRender from '../../utils/shallowRender'

import State from './'

const TestClass = () => <div/>

test('State 1', () => {
  const component = shallowRender(
    <State><TestClass/></State>
  )
  assert(_.isFunction(component.props.onUpdate))
  assert(_.isFunction(component.props.setState))
})

test('State 2', () => {
  const startWith = props => {
    props.setState({test: true})
  }
  const component = shallowRender(
    <State
      startWith={startWith}
    >
      <TestClass/>
    </State>
  )
  assert(component.props.test)
})
