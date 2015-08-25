
import test from 'tape'

import React from 'react'
import renderComponent from '../renderComponentTest'

import Chart2 from './Chart2'

test('Chart2', t => {
  var component = renderComponent(<Chart2/>)
  t.equal(component.type, 'div')
  t.end()
})
