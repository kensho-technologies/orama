// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'
import * as React from 'react'

import shallowRender from '../helpers/shallowRender'
import LabelBottom from '../../src/Chart/LabelBottom'

test('LabelBottom', () => {
  const component = shallowRender(<LabelBottom plotRect={{}} theme={{}} />)
  assert.deepEqual(component.type, 'div')
})
