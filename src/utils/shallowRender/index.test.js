// Copyright 2017 Kensho Technologies, Inc.

import {it as test} from 'mocha'
import assert from 'assert'
import React from 'react'

import shallowRender from './'

const Component = () => <div/>

test('shallowRender.funcName', () => {
  const component = shallowRender(<Component/>)
  assert.deepEqual(component.type, 'div')
})
