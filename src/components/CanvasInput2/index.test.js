
import {it as test} from 'mocha'
import assert from 'assert'

import React from 'react'
import shallowRender from '@luiscarli/shallow-render'

import CanvasInput from './'

test('CanvasInput', () => {
  const component = shallowRender(<CanvasInput size={{width: 0, height: 0}}/>)
  assert.strictEqual(component.type, 'canvas')
})
