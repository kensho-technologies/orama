
import {it as test} from 'mocha'
import assert from 'assert'

import * as methods from './getMethods'

test('visUtils.toType', () => {
  assert.deepEqual(methods.toType(), 'undefined')
  assert.deepEqual(methods.toType([]), 'array')
  assert.deepEqual(methods.toType({}), 'object')
  assert.deepEqual(methods.toType(10), 'number')
  assert.deepEqual(methods.toType('10'), 'string')
  assert.deepEqual(methods.toType(new Date()), 'date')
})
test('Chart2.getType', () => {
  const props = {
    xArray: [1, 2, 'string', new Date()],
    yArray: ['a', 'b', 1, new Date()],
    fillArray: [new Date(), new Date(), 'a', 1],
  }
  assert.deepEqual(
    methods.getType(props, 'x'),
    'linear'
  )
  assert.deepEqual(
    methods.getType(props, 'y'),
    'ordinal'
  )
  assert.deepEqual(
    methods.getType(props, 'fill'),
    'time'
  )
  assert.deepEqual(
    methods.getType(props),
    'linear'
  )
})
test('Chart2.getDomain', () => {
  const props = {
    xArray: [1, 2, 3, 4],
    yArray: ['a', 'b', 'c'],
    fillArray: [new Date(2015, 1), new Date(2015, 2), new Date(2015, 3)],
    xType: 'linear',
    yType: 'ordinal',
    fillType: 'time',
  }
  assert.deepEqual(
    methods.getDomain(props, 'x'),
    [1, 4]
  )
  assert.deepEqual(
    methods.getDomain(props, 'y'),
    ['a', 'b', 'c']
  )
  assert.deepEqual(
    methods.getDomain(props, 'fill'),
    [new Date(2015, 1), new Date(2015, 3)]
  )
})
test('Chart2.getRange', () => {
  const props = {
    plotRect: {x: 0, y: 0, width: 500, height: 500},
    xType: 'linear',
    yType: 'ordinal',
    fillType: 'time',
  }
  assert.deepEqual(
    methods.getRange(props, 'x'),
    [0, 500]
  )
  assert.deepEqual(
    methods.getRange(props, 'y'),
    [500, 0]
  )
  assert.deepEqual(
    methods.getRange(props, 'fill'),
    methods.RANGE_LINEAR_COLOR
  )
})
test('Chart2.getTickCount', () => {
  const props = {
    xRange: [0, 500],
    yRange: [500, 0],
    yTickSpace: 10,
  }
  assert.deepEqual(
    methods.getTickCount(props, 'x'),
    5
  )
  assert.deepEqual(
    methods.getTickCount(props, 'y'),
    50
  )
})
