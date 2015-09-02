
import {it as test} from 'mocha'
import assert from 'assert'

import * as methods from './'

const RECT_BASE = {x: 0, y: 0, width: 100, height: 100}

test('visUtils.toType', () => {
  assert(methods.toType)
  assert.deepEqual(methods.toType(), 'undefined')
  assert.deepEqual(methods.toType([]), 'array')
  assert.deepEqual(methods.toType({}), 'object')
  assert.deepEqual(methods.toType(10), 'number')
  assert.deepEqual(methods.toType('10'), 'string')
  assert.deepEqual(methods.toType(new Date()), 'date')
})

test('visUtils.getType', () => {
  assert(methods.getType)
  assert.deepEqual(
    methods.getType([{t: 1}, {t: 2}, {t: 'a'}], 't'),
    'linear'
  )
  assert.deepEqual(
    methods.getType([{t: 1}, {t: '2'}, {t: 'a'}], 't'),
    'ordinal'
  )
  assert.deepEqual(
    methods.getType([{t: new Date()}, {t: new Date()}, {t: 'a'}], 't'),
    'time'
  )
})

test('visUtils.getDomain', () => {
  assert(methods.getDomain)
  assert.deepEqual(
    methods.getDomain([{t: 'a'}, {t: 'b'}], 't', 'ordinal'),
    ['a', 'b']
  )
  assert.deepEqual(
    methods.getDomain([{t: 1}, {t: 2}], 't', 'linear'),
    [1, 2]
  )
})

test('visUtils.getRange', () => {
  assert(methods.getRange)
  assert.throws(methods.getRange)
  assert.deepEqual(
    methods.getRange('x', RECT_BASE),
    [0, 100]
  )
  assert.deepEqual(
    methods.getRange('y', RECT_BASE),
    [100, 0]
  )
  assert.deepEqual(
    methods.getRange('color', RECT_BASE),
    methods.RANGE_LINEAR_COLOR
  )
  assert.deepEqual(
    methods.getRange('color', RECT_BASE, 'ordinal'),
    methods.RANGE_ORDINAL_COLOR
  )
})

test('visUtils.getTickCount', () => {
  assert(methods.getTickCount)
  assert.throws(methods.getTickCount)
  assert.deepEqual(
    methods.getTickCount('x', [0, 600]),
    6
  )
  assert.deepEqual(
    methods.getTickCount('y', [500, 0]),
    6
  )
})

test('visUtils.getD3Scale', () => {
  assert(methods.getD3Scale)
  assert.throws(methods.getD3Scale)
  assert.deepEqual(
    typeof methods.getD3Scale('linear'),
    'function'
  )
})

test('visUtils.getD3Scale', () => {
  assert(methods.getD3Scale)
  assert.throws(methods.getD3Scale)
  assert.deepEqual(
    typeof methods.getD3Scale('linear'),
    'function'
  )
})

test('visUtils.getScale', () => {
  assert(methods.getScale)
  const scaleOrdinal = methods.getScale('x', 'ordinal', ['a', 'b'], [0, 1])
  assert.deepEqual(
    scaleOrdinal('a'),
    0.25
  )
  const scaleLinear1 = methods.getScale('x', 'linear', [0, 100], [0, 1], 10)
  assert.deepEqual(
    scaleLinear1(50),
    0.5
  )
  const scaleLinear2 = methods.getScale(null, 'linear', [100, 100])
  assert.deepEqual(
    scaleLinear2(50),
    0
  )
})

test('visUtils.getTicks', () => {
  assert.deepEqual(
    methods.getTicks('linear', [0, 100], 3),
    [0, 50, 100]
  )
  assert.deepEqual(
    methods.getTicks('linear', [0, 100]),
    [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
  )
})

test('visUtils.getMap', () => {
  assert.deepEqual(
    typeof methods.getMap(),
    'function'
  )
  const map = methods.getMap('t', d => d * 2)
  assert.deepEqual(map({t: 1}), 2)
})
