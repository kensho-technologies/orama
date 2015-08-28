
import test from 'tape'

import React from 'react'
import {renderComponent} from '../../assertionHelpers'

import CanvasRender from './'

test('CanvasRender', t => {
  var component = renderComponent(<CanvasRender/>)
  t.equal(component.type, 'canvas')
  t.end()
})
