
import test from 'tape'

import React from 'react'
import renderComponent from '../../renderComponentTest'

import BottomLabel, {getStyles} from './'

test('BottomLabel', t => {
  var component = renderComponent(<BottomLabel/>)
  t.same(component.type, 'div')
  t.end()
})

test('BottomLabel.getStyles', t => {
  t.ok(getStyles())
  t.end()
})
