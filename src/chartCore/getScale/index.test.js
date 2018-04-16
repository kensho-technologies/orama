// Copyright 2017 Kensho Technologies, LLC.

import {it as test} from 'mocha'
import assert from 'assert'

import * as d3Scale from 'd3-scale'

import * as methods from './'

test('Chart.getAxisScale | case 1', () => {
  const props = {
    xType: 'ordinal',
    xDomain: ['a', 'b', 'c'],
    xRange: [0, 500],
  }
  assert(methods.getAxisScale(props, 'x'))
})
test('Chart.getAxisScale | case 2', () => {
  const props = {
    xType: 'linear',
    xDomain: [1, 1],
    xRange: [0, 500],
  }
  assert(methods.getAxisScale(props, 'x'))
})
test('Chart.getAxisScale | case 3', () => {
  const props = {
    xType: 'time',
    xDomain: [new Date(2015, 1), new Date(2015, 2)],
    xRange: [0, 500],
  }
  assert(methods.getAxisScale(props, 'x'))
})
test('Chart.getAxisScale | case 4', () => {
  const props = {
    xType: 'linear',
    xDomain: [1, 10],
    xRange: [0, 500],
  }
  assert(methods.getAxisScale(props, 'x'))
})

test('Chart.getAxisScale | case 1', () => {
  const props = {
    xType: 'ordinal',
    xDomain: ['a', 'b', 'c'],
    xRange: [0, 500],
  }
  assert(methods.getAxisScale(props, 'x'))
})
test('Chart.getDefaultScale | case 2', () => {
  const props = {
    xType: 'linear',
    xDomain: [1, 1],
    xRange: [0, 500],
  }
  assert(methods.getDefaultScale(props, 'x'))
})
test('Chart.getDefaultScale | case 3', () => {
  const props = {
    xType: 'time',
    xDomain: [new Date(2015, 1), new Date(2015, 2)],
    xRange: [0, 500],
  }
  assert(methods.getDefaultScale(props, 'x'))
})
test('Chart.getDefaultScale | case 4', () => {
  const props = {
    xType: 'linear',
    xDomain: [1, 10],
    xRange: [0, 500],
  }
  assert(methods.getDefaultScale(props, 'x'))
})

test('Chart.getScale | case 1', () => {
  const props = {
    xType: 'ordinal',
    xDomain: ['a', 'b', 'c'],
    xRange: [0, 500],
  }
  assert(methods.getScale(props, 'x'))
})
test('Chart.getScale | case 2', () => {
  const props = {
    fillType: 'ordinal',
    fillDomain: ['a', 'b', 'c'],
    fillRange: [0, 500],
  }
  assert(methods.getScale(props, 'fill'))
})
test('getScale.getOrdinalInvert', () => {
  const scale = d3Scale.scalePoint()
    .domain(['a', 'b', 'c', 'd'])
    .range([0, 100])
  const invert = methods.getOrdinalInvert(scale)
  assert.equal(invert(0), 'a')
  assert.equal(invert(20), 'b')
})
