// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'
import * as React from 'react'

import shallowRender from '../utils/shallowRender'

import {StateChart} from '.'

test('StateChart', () => {
  const component = shallowRender(<StateChart />)
  assert.deepEqual(component.type, 'div')
})
