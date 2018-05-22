// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'

import {PLOT_RECT as plotRect} from '../../chartCore/defaults'

import {bars} from '.'

const identity = d => d
const xScale = identity
const yScale = identity

test('Chart.bars 1', () => {
  const props = {
    data: [{x: 1, y: 1}],
    xScale,
    yScale,
    plotRect,
  }
  const renderData = bars(props)
  assert.deepEqual(renderData[0].type, 'area')
})
test('Chart.bars 2', () => {
  const props = {
    data: [{x1: 1, x2: 1, y: 1}],
    xScale,
    yScale,
    plotRect,
  }
  const renderData = bars(props)
  assert.deepEqual(renderData[0].type, 'area')
})
test('Chart.bars 2', () => {
  const props = {
    data: [{y1: 1, y2: 1, x: 1}],
    xScale,
    yScale,
    plotRect,
  }
  const renderData = bars(props)
  assert.deepEqual(renderData[0].type, 'area')
})
test('Chart.bars 1', () => {
  const props = {
    data: [{x: 1, y: 1}],
    xDomain: [1, 2],
    xType: 'ordinal',
    xScale,
    yScale,
    plotRect,
  }
  const renderData = bars(props)
  assert.deepEqual(renderData[0].type, 'area')
})
test('Chart.bars 1', () => {
  const props = {
    data: [{x: 1, y: 1}],
    yDomain: [1, 2],
    yType: 'ordinal',
    xScale,
    yScale,
    plotRect,
  }
  const renderData = bars(props)
  assert.deepEqual(renderData[0].type, 'area')
})
test('Chart.bars grouped data', () => {
  const props = {
    data: [[{x: 1, y: 1}]],
    xScale,
    yScale,
    plotRect,
  }
  const renderData = bars(props)
  assert.deepEqual(renderData[0].type, 'area')
})
