

import {it as test} from 'mocha'
import assert from 'assert'

import * as methods from './points'

test('Chart2.points', () => {
  const renderData = methods.points({
    data: [{x: 1, y: 1}],
    xMap: d => d,
    yMap: d => d,
  })
  assert.deepEqual(
    renderData[0],
    {
      ...renderData[0],
      alpha: 1,
      fill: 'steelblue',
      type: 'area',
    }
  )
})
test('Chart2.points missing yMap', () => {
  const renderData = methods.points({
    data: [{x: 1, y: 1}],
    xMap: d => d,
  })
  assert.deepEqual(
    renderData[0],
    {
      ...renderData[0],
      alpha: 1,
      fill: 'steelblue',
      type: 'area',
    }
  )
})
test('Chart2.points grouped data', () => {
  const renderData = methods.points({
    data: [[{x: 1, y: 1}]],
    xMap: d => d,
    yMap: d => d,
  })
  assert.deepEqual(
    renderData[0],
    {
      ...renderData[0],
      alpha: 1,
      fill: 'steelblue',
      type: 'area',
    }
  )
})
