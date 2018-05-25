// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'

import points from '.'

test('Chart.points', () => {
  const renderData = points({
    data: [{x: 1, y: 1}],
    xScale: d => d,
    yScale: d => d,
  })
  assert.deepEqual(renderData[0], {
    ...renderData[0],
    type: 'area',
  })
})

test('Chart.points missing yMap', () => {
  const renderData = points({
    data: [{x: 1, y: 1}],
    xScale: d => d,
  })
  assert.deepEqual(renderData[0], {
    ...renderData[0],
    type: 'area',
  })
})

test('Chart.points grouped data', () => {
  const renderData = points({
    data: [[{x: 1, y: 1}]],
    xScale: d => d,
    yScale: d => d,
  })
  assert.deepEqual(renderData[0], {
    ...renderData[0],
    type: 'area',
  })
})
