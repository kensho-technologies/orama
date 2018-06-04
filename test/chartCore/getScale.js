// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'
import {scalePoint} from 'd3-scale'

import getScale, {
  getAxisScale,
  getDefaultScale,
  getOrdinalInvert,
} from '../../src/chartCore/getScale'

test('Chart.getAxisScale | case 1', () => {
  const props = {
    xType: 'ordinal',
    xDomain: ['a', 'b', 'c'],
    xRange: [0, 500],
  }
  assert(getAxisScale(props, 'x'))
})
test('Chart.getAxisScale | case 2', () => {
  const props = {
    xType: 'linear',
    xDomain: [1, 1],
    xRange: [0, 500],
  }
  assert(getAxisScale(props, 'x'))
})
test('Chart.getAxisScale | case 3', () => {
  const props = {
    xType: 'time',
    xDomain: [new Date(2015, 1), new Date(2015, 2)],
    xRange: [0, 500],
  }
  assert(getAxisScale(props, 'x'))
})
test('Chart.getAxisScale | case 4', () => {
  const props = {
    xType: 'linear',
    xDomain: [1, 10],
    xRange: [0, 500],
  }
  assert(getAxisScale(props, 'x'))
})

test('Chart.getAxisScale | case 1', () => {
  const props = {
    xType: 'ordinal',
    xDomain: ['a', 'b', 'c'],
    xRange: [0, 500],
  }
  assert(getAxisScale(props, 'x'))
})
test('Chart.getDefaultScale | case 2', () => {
  const props = {
    xType: 'linear',
    xDomain: [1, 1],
    xRange: [0, 500],
  }
  assert(getDefaultScale(props, 'x'))
})
test('Chart.getDefaultScale | case 3', () => {
  const props = {
    xType: 'time',
    xDomain: [new Date(2015, 1), new Date(2015, 2)],
    xRange: [0, 500],
  }
  assert(getDefaultScale(props, 'x'))
})
test('Chart.getDefaultScale | case 4', () => {
  const props = {
    xType: 'linear',
    xDomain: [1, 10],
    xRange: [0, 500],
  }
  assert(getDefaultScale(props, 'x'))
})

test('Chart.getScale | case 1', () => {
  const props = {
    xType: 'ordinal',
    xDomain: ['a', 'b', 'c'],
    xRange: [0, 500],
  }
  assert(getScale(props, 'x'))
})
test('Chart.getScale | case 2', () => {
  const props = {
    fillType: 'ordinal',
    fillDomain: ['a', 'b', 'c'],
    fillRange: [0, 500],
  }
  assert(getScale(props, 'fill'))
})
test('getScale.getOrdinalInvert', () => {
  const scale = scalePoint()
    .domain(['a', 'b', 'c', 'd'])
    .range([0, 100])
  const invert = getOrdinalInvert(scale)
  assert.equal(invert(0), 'a')
  assert.equal(invert(20), 'b')
})
