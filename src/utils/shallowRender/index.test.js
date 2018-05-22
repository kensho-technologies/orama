// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'
import * as React from 'react'

import shallowRender from '.'

const Component = () => <div />

test('shallowRender.funcName', () => {
  const component = shallowRender(<Component />)
  assert.deepEqual(component.type, 'div')
})
