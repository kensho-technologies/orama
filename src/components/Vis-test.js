
import test from 'tape'

import React from 'react'
import renderComponent from '../renderComponentTest'

import Vis from './Vis'

test('Vis', t => {
  var component = renderComponent(<Vis/>)
  t.equal(component.type, 'div')
  t.end()
})
