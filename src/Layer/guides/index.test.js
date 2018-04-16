// Copyright 2017 Kensho Technologies, LLC.

import {it as test} from 'mocha'
import assert from 'assert'
import {PLOT_RECT} from '../../chartCore/defaults'

import * as methods from './'

test('Chart.guides', () => {
  const renderData = methods.guides({
    data: [{x: 1, y: 1}],
    plotRect: PLOT_RECT,
    xScale: d => d,
    yScale: d => d,
  })
  assert.deepEqual(
    renderData[0],
    {
      ...renderData[0],
      type: 'line',
    }
  )
})
test('Chart.guides missing yMap', () => {
  const renderData = methods.guides({
    data: [{x: 1, y: 1}],
    plotRect: PLOT_RECT,
    xScale: d => d,
  })
  assert.deepEqual(
    renderData[0],
    {
      ...renderData[0],
      type: 'line',
    }
  )
})
test('Chart.guides grouped data', () => {
  const renderData = methods.guides({
    data: [[{x: 1, y: 1}]],
    plotRect: PLOT_RECT,
    xScale: d => d,
    yScale: d => d,
  })
  assert.deepEqual(
    renderData[0],
    {
      ...renderData[0],
      type: 'line',
    }
  )
})
