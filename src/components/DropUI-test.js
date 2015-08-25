
import test from 'tape'

import React from 'react'
import renderComponent from '../renderComponentTest'

import DropUI from './DropUI'

test('DropUI', t => {
  var component = renderComponent(<DropUI/>)
  t.equal(component.type, 'div')
  t.end()
})
