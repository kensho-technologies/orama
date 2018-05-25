// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'

import {PLOT_RECT} from '../../chartCore/defaults'

import guides from '.'

test('Chart.guides', () => {
  const renderData = guides({
    data: [{x: 1, y: 1}],
    plotRect: PLOT_RECT,
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
    plotRect: PLOT_RECT,
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
    plotRect: PLOT_RECT,
    xScale: d => d,
    yScale: d => d,
  })
  assert.deepEqual(renderData[0], {
    ...renderData[0],
    type: 'line',
  })
})
