// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'
import * as React from 'react'

import shallowRender from '../helpers/shallowRender'
import CanvasInput from '../../src/CanvasInput'

test('CanvasInput', () => {
  const rootProps = {
    width: 500,
    height: 500,
  }
  const component = shallowRender(<CanvasInput onUpdate={() => undefined} rootProps={rootProps} />)
  assert.strictEqual(component.type, 'div')
})
