// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'

import {DEFAULT_THEME as theme} from '../../src/defaultTheme'
import {getDomain, getRange, getTickCount, getType, toType} from '../../src/chartCore/getForKey'

test('visUtils.toType', () => {
  assert.deepEqual(toType(), 'undefined')
  assert.deepEqual(toType([]), 'array')
  assert.deepEqual(toType({}), 'object')
  assert.deepEqual(toType(10), 'number')
  assert.deepEqual(toType('10'), 'string')
  assert.deepEqual(toType(new Date()), 'date')
})
test('Chart/getMethods.getType', () => {
  const props = {
    xArray: [1, 2, 'string', new Date()],
    yArray: ['a', 'b', 1, new Date()],
    fillArray: [new Date(), new Date(), 'a', 1],
  }
  assert.deepEqual(getType(props, 'x'), 'linear')
  assert.deepEqual(getType(props, 'y'), 'ordinal')
  assert.deepEqual(getType(props, 'fill'), 'time')
  assert.deepEqual(getType(props), undefined)
})
test('Chart/getMethods.getDomain', () => {
  const props = {
    xArray: [1, 2, 3, 4],
    yArray: ['a', 'b', 'c'],
    fillArray: [new Date(2015, 1), new Date(2015, 2), new Date(2015, 3)],
    xType: 'linear',
    yType: 'ordinal',
    fillType: 'time',
  }
  assert.deepEqual(getDomain(props, 'x'), [1, 4])
  assert.deepEqual(getDomain(props, 'y'), ['a', 'b', 'c'])
  assert.deepEqual(getDomain(props, 'fill'), [new Date(2015, 1), new Date(2015, 3)])
})
test('Chart/getMethods.getDomain zeroBased', () => {
  const props = {
    xArray: [1, 2, 3, 4],
    xType: 'linear',
    xZeroBased: true,
  }
  assert.deepEqual(getDomain(props, 'x'), [0, 4])
})
test('Chart/getMethods.getRange', () => {
  const props = {
    plotRect: {x: 0, y: 0, width: 500, height: 500},
    xType: 'linear',
    yType: 'ordinal',
    fillType: 'time',
    theme,
  }
  assert.deepEqual(getRange(props, 'x'), [0, 500])
  assert.deepEqual(getRange(props, 'y'), [500, 0])
  assert.deepEqual(getRange(props, 'fill'), theme.plotLinearRangeFill)
})
test('Chart/getMethods.getTickCount', () => {
  const props = {
    xRange: [0, 500],
    yRange: [500, 0],
    yTickSpace: 10,
  }
  assert.deepEqual(getTickCount(props, 'x'), 4)
  assert.deepEqual(getTickCount(props, 'y'), 50)
})
