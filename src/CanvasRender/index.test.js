// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'
import * as React from 'react'

import shallowRender from '../utils/shallowRender'

import {CanvasRender} from '.'

test('CanvasRender', () => {
  const component = shallowRender(<CanvasRender />)
  assert.strictEqual(component.type, 'canvas')
})
