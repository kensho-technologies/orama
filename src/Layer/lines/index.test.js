// Copyright 2017 Kensho Technologies, Inc.

import {it as test, describe} from 'mocha'
import assert from 'assert'

import {lines} from './'
import {getPointData} from './'
import {hoverSolver} from './'

const identity = d => d
const scale = identity
scale.invert = identity

test('Chart/lines 1', () => {
  const renderData = lines({
    data: [{x: 1, y: 1}],
    xScale: d => d,
    yScale: d => d,
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
test('Chart/lines grouped data', () => {
  const renderData = lines({
    data: [[{x: 1, y: 1}]],
    xScale: d => d,
    yScale: d => d,
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

test('Chart/lines.getPointData 1', () => {
  const pointData = getPointData({}, {})
  assert.deepEqual(
    pointData,
    undefined
  )
})
test('Chart/lines.getPointData 2', () => {
  const props = {
    x: 'x', y: 'y',
    xScale: d => d, yScale: d => d,
  }
  const datum = {x: 10, y: 10}
  const pointData = getPointData(props, datum)

  assert.deepEqual(
    pointData.type,
    'area'
  )
})

describe('Chart/lines.hoverSolver', () => {
  const props = {
    x: 'x', y: 'y',
    xScale: scale,
    yScale: scale,
  }
  const hoverData = [
    {x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 1},
  ]
  test('floor', () => {
    const localMouse = {x: 2.1, y: 1}
    const result = hoverSolver(props, hoverData, {}, localMouse)
    assert.deepEqual(
      result.hoverData,
      {x: 2, y: 1}
    )
  })
  test('ceil', () => {
    const localMouse = {x: 1.6, y: 1}
    const result = hoverSolver(props, hoverData, {}, localMouse)
    assert.deepEqual(
      result.hoverData,
      {x: 2, y: 1}
    )
  })
  test('undefined', () => {
    const localMouse = {x: undefined, y: 1}
    const result = hoverSolver(props, hoverData, {}, localMouse)
    assert.deepEqual(
      result.hoverData,
      {x: 3, y: 1}
    )
  })
  test('0', () => {
    const localMouse = {x: 0, y: 1}
    const result = hoverSolver(props, hoverData, {}, localMouse)
    assert.deepEqual(
      result.hoverData,
      {x: 1, y: 1}
    )
  })
})
