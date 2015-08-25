
import test from 'tape'

import React from 'react'
import renderComponent from '../renderComponentTest'

import CanvasRender from './CanvasRender'

test('CanvasRender', t => {
  var component = renderComponent(<CanvasRender/>)
  t.equal(component.type, 'canvas')
  t.end()
})
