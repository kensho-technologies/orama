// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'
import * as React from 'react'

import shallowRender from '../helpers/shallowRender'
import LeftLabel from '../../src/ChartBackground/LeftLabel'

test('LeftLabel', () => {
  const component = shallowRender(<LeftLabel plotRect={{}} theme={{}} />)
  assert.strictEqual(component.type, 'div')
})
