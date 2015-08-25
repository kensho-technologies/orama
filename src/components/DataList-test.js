
import test from 'tape'

import React from 'react'
import renderComponent from '../renderComponentTest'

import DataList from './DataList'

test('DataList', t => {
  var component = renderComponent(<DataList/>)
  t.equal(component.type, 'div')
  t.end()
})
