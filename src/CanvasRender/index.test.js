// Copyright 2017 Kensho Technologies, Inc.

import {it as test} from 'mocha'
import assert from 'assert'

import React from 'react'
import shallowRender from '../utils/shallowRender'

import {CanvasRender} from './'

test('CanvasRender', () => {
  const component = shallowRender(
    <CanvasRender/>
  )
  assert.strictEqual(component.type, 'canvas')
})
