// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'
import * as React from 'react'

import shallowRender from '../helpers/shallowRender'
import CanvasRender from '../../src/CanvasRender'

test('CanvasRender', () => {
  const component = shallowRender(<CanvasRender render={() => {}} theme={{}} />)
  assert.strictEqual(component.type, 'canvas')
})
