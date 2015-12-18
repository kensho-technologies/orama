
import {it as test} from 'mocha'
import assert from 'assert'

import * as methods from './'

test('Chart.lines', () => {
  const renderData = methods.lines({
    data: [{x: 1, y: 1}],
    xScale: d => d,
    yScale: d => d,
  })
  assert.deepEqual(
    renderData[0],
    {
      ...renderData[0],
      type: 'line',
      stroke: undefined,
      lineWidth: undefined,
    }
  )
})
test('Chart.lines grouped data', () => {
  const renderData = methods.lines({
    data: [[{x: 1, y: 1}]],
    xScale: d => d,
    yScale: d => d,
  })
  assert.deepEqual(
    renderData[0],
    {
      ...renderData[0],
      type: 'line',
      stroke: undefined,
      lineWidth: undefined,
    }
  )
})
