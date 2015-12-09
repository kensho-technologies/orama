
import {it as test} from 'mocha'
import assert from 'assert'

import React from 'react'
import shallowRender from '@luiscarli/shallow-render'

import {CanvasRender} from './'

test('CanvasRender', () => {
  const component = shallowRender(
    <CanvasRender/>
  )
  assert.strictEqual(component.type, 'canvas')
})
