
import {it as test} from 'mocha'
import assert from 'assert'

import * as methods from './'

test('Chart2.lines', () => {
  const renderData = methods.lines({
    data: [{x: 1, y: 1}],
    xMap: d => d,
    yMap: d => d,
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
test('Chart2.lines grouped data', () => {
  const renderData = methods.lines({
    data: [[{x: 1, y: 1}]],
    xMap: d => d,
    yMap: d => d,
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
