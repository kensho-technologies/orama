// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'

import {PLOT_RECT as plotRect} from '../../src/defaults'
import brushes from '../../src/plot/brushes'

test('Chart/brushes 1', () => {
  const renderData = brushes({
    data: [{x: 1, y: 1}],
    xScale: d => d,
    yScale: d => d,
  })
  assert.deepEqual(renderData[0].type, 'area')
})
test('Chart/brushes 2', () => {
  const renderData = brushes({
    data: [{x1: 1, x2: 1}],
    xScale: d => d,
    yScale: d => d,
    plotRect,
  })
  assert.deepEqual(renderData[0].type, 'area')
})
test('Chart/brushes 3', () => {
  const renderData = brushes({
    data: [{y1: 1, y2: 1}],
    xScale: d => d,
    yScale: d => d,
    plotRect,
  })
  assert.deepEqual(renderData[0].type, 'area')
})
test('Chart/brushes 4', () => {
  const renderData = brushes({
    data: [{x1: 1, x2: 1, y1: 1, y2: 1}],
    xScale: d => d,
    yScale: d => d,
    plotRect,
  })
  assert.deepEqual(renderData[0].type, 'area')
})
test('Chart/brushes missing scales', () => {
  const renderData = brushes({
    data: [{x1: 1, x2: 1}],
    plotRect,
  })
  assert.deepEqual(renderData, undefined)
})
test('Chart/brushes grouped data', () => {
  const renderData = brushes({
    data: [[{x1: 1, x2: 1}]],
    xScale: d => d,
    yScale: d => d,
    plotRect,
  })
  assert.deepEqual(renderData[0].type, 'area')
})
