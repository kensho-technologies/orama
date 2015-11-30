

import {it as test} from 'mocha'
import assert from 'assert'

import * as methods from './'

test('Chart.points', () => {
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
      type: 'area',
    }
  )
})
test('Chart.points missing yMap', () => {
  const renderData = methods.points({
    data: [{x: 1, y: 1}],
    xMap: d => d,
  })
  assert.deepEqual(
    renderData[0],
    {
      ...renderData[0],
      alpha: 1,
      type: 'area',
    }
  )
})
test('Chart.points grouped data', () => {
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
      type: 'area',
    }
  )
})
