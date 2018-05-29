// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'
import * as React from 'react'

import shallowRender from '../helpers/shallowRender'
import BottomLabel from '../../src/ChartBackground/BottomLabel'

test('BottomLabel', () => {
  const component = shallowRender(<BottomLabel />)
  assert.deepEqual(component.type, 'div')
})
