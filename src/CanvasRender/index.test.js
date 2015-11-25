
import {it as test} from 'mocha'
import assert from 'assert'

import React from 'react'
import shallowRender from '@luiscarli/shallow-render'

import CanvasRender, {basicRender} from './'

test('CanvasRender', () => {
  const component = shallowRender(
    <CanvasRender
      render={basicRender}
    />
  )
  assert.strictEqual(component.type, 'canvas')
})
