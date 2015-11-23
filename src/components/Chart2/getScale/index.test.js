
import {it as test} from 'mocha'
import assert from 'assert'

import * as methods from './'

test('Chart2.getAxisScale | case 1', () => {
  const props = {
    xType: 'ordinal',
    xDomain: ['a', 'b', 'c'],
    xRange: [0, 500],
  }
  assert(methods.getAxisScale(props, 'x'))
})
test('Chart2.getAxisScale | case 2', () => {
  const props = {
    xType: 'linear',
    xDomain: [1, 1],
    xRange: [0, 500],
  }
  assert(methods.getAxisScale(props, 'x'))
})
test('Chart2.getAxisScale | case 3', () => {
  const props = {
    xType: 'time',
    xDomain: [new Date(2015, 1), new Date(2015, 2)],
    xRange: [0, 500],
  }
  assert(methods.getAxisScale(props, 'x'))
})
test('Chart2.getAxisScale | case 4', () => {
  const props = {
    xType: 'linear',
    xDomain: [1, 10],
    xRange: [0, 500],
  }
  assert(methods.getAxisScale(props, 'x'))
})

test('Chart2.getAxisScale | case 1', () => {
  const props = {
    xType: 'ordinal',
    xDomain: ['a', 'b', 'c'],
    xRange: [0, 500],
  }
  assert(methods.getAxisScale(props, 'x'))
})
test('Chart2.getDefaultScale | case 2', () => {
  const props = {
    xType: 'linear',
    xDomain: [1, 1],
    xRange: [0, 500],
  }
  assert(methods.getDefaultScale(props, 'x'))
})
test('Chart2.getDefaultScale | case 3', () => {
  const props = {
    xType: 'time',
    xDomain: [new Date(2015, 1), new Date(2015, 2)],
    xRange: [0, 500],
  }
  assert(methods.getDefaultScale(props, 'x'))
})
test('Chart2.getDefaultScale | case 4', () => {
  const props = {
    xType: 'linear',
    xDomain: [1, 10],
    xRange: [0, 500],
  }
  assert(methods.getDefaultScale(props, 'x'))
})

test('Chart2.getScale | case 1', () => {
  const props = {
    xType: 'ordinal',
    xDomain: ['a', 'b', 'c'],
    xRange: [0, 500],
  }
  assert(methods.getScale(props, 'x'))
})
test('Chart2.getScale | case 2', () => {
  const props = {
    fillType: 'ordinal',
    fillDomain: ['a', 'b', 'c'],
    fillRange: [0, 500],
  }
  assert(methods.getScale(props, 'fill'))
})
