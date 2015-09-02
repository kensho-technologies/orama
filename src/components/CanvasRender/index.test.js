
import {it as test} from 'mocha'
import assert from 'assert'

import React from 'react'
import renderComponent from '../../renderComponentTest'

import CanvasRender from './'

test('CanvasRender', () => {
  var component = renderComponent(<CanvasRender/>)
  assert.strictEqual(component.type, 'canvas')
})
