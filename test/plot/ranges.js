// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'

import ranges from '../../src/plot/ranges'

const plotRect = {x: 10, y: 10, width: 480, height: 480}

test('Chart/ranges 1', () => {
  const renderData = ranges({
    data: [{x: 1, y: 1}],
    xScale: d => d,
    yScale: d => d,
  })
  assert.deepEqual(renderData[0].type, 'area')
})

test('Chart/ranges 2', () => {
  const renderData = ranges({
    data: [{x1: 1, x2: 1}],
    xScale: d => d,
    yScale: d => d,
    plotRect,
  })
  assert.deepEqual(renderData[0].type, 'area')
})

test('Chart/ranges 3', () => {
  const renderData = ranges({
    data: [{y1: 1, y2: 1}],
    xScale: d => d,
    yScale: d => d,
    plotRect,
  })
  assert.deepEqual(renderData[0].type, 'area')
})

test('Chart/ranges 4', () => {
  const renderData = ranges({
    data: [{x1: 1, x2: 1, y1: 1, y2: 1}],
    xScale: d => d,
    yScale: d => d,
    plotRect,
  })
  assert.deepEqual(renderData[0].type, 'area')
})

test('Chart/ranges missing scales', () => {
  const renderData = ranges({
    data: [{x1: 1, x2: 1}],
    plotRect,
  })
  assert.deepEqual(renderData, undefined)
})

test('Chart/ranges grouped data', () => {
  const renderData = ranges({
    data: [[{x1: 1, x2: 1}]],
    xScale: d => d,
    yScale: d => d,
    plotRect,
  })
  assert.deepEqual(renderData[0].type, 'area')
})
