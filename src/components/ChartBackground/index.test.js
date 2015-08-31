
import test from 'tape'

import React from 'react'
import renderComponent from '../../renderComponentTest'

import ChartBackground, * as localMethods from './'

test('ChartBackground', t => {
  var component = renderComponent(
    <ChartBackground
      size={{width: 0, height: 0}}
    />
  )
  t.same(component.type, 'canvas')
  t.end()
})

test('ChartBackground localMethods.getStyles', t => {
  t.ok(localMethods.getStyles())
  t.end()
})
