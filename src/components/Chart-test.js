
import test from 'tape'

import React from 'react'
import renderComponent from '../renderComponentTest'

import Chart from './Chart'

test('App should exist and render', (t) => {
  t.ok(Chart)
  var component = renderComponent(
    <Chart
        data={[]}
        dimensions={{}}
        margin={{}}
        size={{}}
        />
  )
  t.equal(component.type, 'div')
  t.end()
})
