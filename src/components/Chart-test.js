
import test from 'tape'

import React from 'react'
import renderComponent from '../renderComponentTest'

import * as ChartUtils from './Chart'

test('App should exist and render', (t) => {
  t.ok(ChartUtils.Chart)
  var component = renderComponent(
    <ChartUtils.Chart
        data={[]}
        dimensions={{}}
        margin={{}}
        size={{}}
        />
  )
  t.equal(component.type, 'div')
  t.end()
})
