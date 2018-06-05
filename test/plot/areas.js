// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test, describe} from 'mocha'

import areas, {getPointData, hoverSolver, isPlotNumber, splitBy} from '../../src/plot/areas'

const identity = d => d
const scale = identity
scale.invert = identity

test('Chart/areas 1', () => {
  const renderData = areas({
    data: [{x: 1, y: 1}],
    xScale: d => d,
    yScale: d => d,
  })
  assert.deepEqual(renderData[0], {
    ...renderData[0],
    type: 'area',
    stroke: undefined,
  })
})
test('Chart/areas 2', () => {
  const renderData = areas({
    data: [{x: 1, y: 1, y0: 1}],
    xScale: d => d,
    yScale: d => d,
  })
  assert.deepEqual(renderData[0], {
    ...renderData[0],
    type: 'area',
    stroke: undefined,
  })
})
test('Chart/areas 2', () => {
  const renderData = areas({
    data: [{x: 1, y: 1, x0: 1}],
    xScale: d => d,
    yScale: d => d,
  })
  assert.deepEqual(renderData[0], {
    ...renderData[0],
    type: 'area',
    stroke: undefined,
  })
})
test('Chart/areas grouped data', () => {
  const renderData = areas({
    data: [[{x: 1, y: 1}]],
    xScale: d => d,
    yScale: d => d,
  })
  assert.deepEqual(renderData[0], {
    ...renderData[0],
    type: 'area',
    stroke: undefined,
  })
})

test('Chart/areas.getPointData 1', () => {
  const pointData = getPointData({}, {})
  assert.deepEqual(pointData, undefined)
})
test('Chart/areas.getPointData 2', () => {
  const props = {
    x: 'x',
    y: 'y',
    xScale: d => d,
    yScale: d => d,
  }
  const datum = {x: 10, y: 10}
  const pointData = getPointData(props, datum, 'y')

  assert.deepEqual(pointData.type, 'area')
})

describe('Chart/areas.hoverSolver', () => {
  const props = {
    x: 'x',
    y: 'y',
    xScale: scale,
    yScale: scale,
  }
  const hoverData = [{x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 1}]
  test('floor', () => {
    const localMouse = {x: 2.1, y: 1}
    const result = hoverSolver(props, hoverData, {}, localMouse)
    assert.deepEqual(result.hoverData, {x: 2, y: 1})
  })
  test('ceil', () => {
    const localMouse = {x: 1.6, y: 1}
    const result = hoverSolver(props, hoverData, {}, localMouse)
    assert.deepEqual(result.hoverData, {x: 2, y: 1})
  })
  test('undefined', () => {
    const localMouse = {x: undefined, y: 1}
    const result = hoverSolver(props, hoverData, {}, localMouse)
    assert.deepEqual(result.hoverData, {x: 3, y: 1})
  })
  test('0', () => {
    const localMouse = {x: 0, y: 1}
    const result = hoverSolver(props, hoverData, {}, localMouse)
    assert.deepEqual(result.hoverData, {x: 1, y: 1})
  })
})

describe('Layer/areas.isPlotNumber', () => {
  test('NaN', () => {
    assert.equal(isPlotNumber(NaN), false)
  })
  test('"a"', () => {
    assert.equal(isPlotNumber('a'), false)
  })
  test('undefined', () => {
    assert.equal(isPlotNumber(undefined), false)
  })
  test('32', () => {
    assert.equal(isPlotNumber(32), true)
  })
})

describe('Layer/areas.splitBy', () => {
  test('empty array', () => {
    assert.deepEqual(splitBy([], Boolean), [[]])
  })
  test('splits by the provided iteratee', () => {
    assert.deepEqual(splitBy(['foo', 'bar', 1, null, 2, 3], d => d === null), [
      ['foo', 'bar', 1],
      [2, 3],
    ])
  })
  test('no splits', () => {
    assert.deepEqual(splitBy(['foo', 'blah', 1, 2, 3], d => d === null), [['foo', 'blah', 1, 2, 3]])
  })
  test('multiple splits', () => {
    assert.deepEqual(splitBy([1, 2, false, 3, 4, false, 5, 6], d => !d), [[1, 2], [3, 4], [5, 6]])
  })

  test('beginning split', () => {
    assert.deepEqual(splitBy([false, 1, 2, 3], d => !d), [[], [1, 2, 3]])
  })
  test('ending split', () => {
    assert.deepEqual(splitBy([1, 2, 3, false], d => !d), [[1, 2, 3], []])
  })
})
