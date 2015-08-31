
import test from 'tape'

import React from 'react'
import renderComponent from '../../renderComponentTest'

import Chart from './'

test('Chart', t => {
  var component = renderComponent(<Chart/>)
  t.equal(component.type, 'div')
  t.end()
})
