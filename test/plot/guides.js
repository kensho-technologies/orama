// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'

import guides from '../../src/plot/guides'

const plotRect = {x: 10, y: 10, width: 480, height: 480}

test('Chart.guides', () => {
  const renderData = guides({
    data: [{x: 1, y: 1}],
    plotRect,
    xScale: d => d,
    yScale: d => d,
  })
  assert.deepEqual(renderData[0], {
    ...renderData[0],
    type: 'line',
  })
})

test('Chart.guides missing yMap', () => {
  const renderData = guides({
    data: [{x: 1, y: 1}],
    plotRect,
    xScale: d => d,
  })
  assert.deepEqual(renderData[0], {
    ...renderData[0],
    type: 'line',
  })
})

test('Chart.guides grouped data', () => {
  const renderData = guides({
    data: [[{x: 1, y: 1}]],
    plotRect,
    xScale: d => d,
    yScale: d => d,
  })
  assert.deepEqual(renderData[0], {
    ...renderData[0],
    type: 'line',
  })
})
