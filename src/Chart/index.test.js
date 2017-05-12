// Copyright 2017 Kensho Technologies, Inc.

import {it as test} from 'mocha'
import assert from 'assert'

import React from 'react'
import shallowRender from '../utils/shallowRender'

import {StateChart} from './'

test('StateChart', () => {
  const component = shallowRender(
    <StateChart/>
  )
  assert.deepEqual(component.type, 'div')
})
