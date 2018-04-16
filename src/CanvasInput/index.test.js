// Copyright 2017 Kensho Technologies, LLC.

import {it as test} from 'mocha'
import assert from 'assert'

import React from 'react'
import shallowRender from '../utils/shallowRender'

import {CanvasInput} from './'

test('CanvasInput', () => {
  const rootProps = {
    width: 500,
    height: 500,
  }
  const component = shallowRender(
    <CanvasInput
      onUpdate={() => undefined}
      rootProps={rootProps}
    />
  )
  assert.strictEqual(component.type, 'div')
})
