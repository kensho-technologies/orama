
import test from 'tape'

import * as methods from './'

const RECT_BASE = {x: 0, y: 0, width: 100, height: 100}

test('visUtils.toType', t => {
  t.ok(methods.toType)
  t.same(methods.toType(), 'undefined')
  t.same(methods.toType([]), 'array')
  t.same(methods.toType({}), 'object')
  t.same(methods.toType(10), 'number')
  t.same(methods.toType('10'), 'string')
  t.same(methods.toType(new Date()), 'date')
  t.end()
})

test('visUtils.getType', t => {
  t.ok(methods.getType)
  t.same(
    methods.getType([{t: 1}, {t: 2}, {t: 'a'}], 't'),
    'linear'
  )
  t.same(
    methods.getType([{t: 1}, {t: '2'}, {t: 'a'}], 't'),
    'ordinal'
  )
  t.same(
    methods.getType([{t: new Date()}, {t: new Date()}, {t: 'a'}], 't'),
    'time'
  )
  t.end()
})

test('visUtils.getDomain', t => {
  t.ok(methods.getDomain)
  t.same(
    methods.getDomain([{t: 'a'}, {t: 'b'}], 't', 'ordinal'),
    ['a', 'b']
  )
  t.same(
    methods.getDomain([{t: 1}, {t: 2}], 't', 'linear'),
    [1, 2]
  )
  t.end()
})

test('visUtils.getRange', t => {
  t.ok(methods.getRange)
  t.throws(methods.getRange)
  t.same(
    methods.getRange('x', RECT_BASE),
    [0, 100]
  )
  t.same(
    methods.getRange('y', RECT_BASE),
    [100, 0]
  )
  t.same(
    methods.getRange('color', RECT_BASE),
    methods.RANGE_LINEAR_COLOR
  )
  t.same(
    methods.getRange('color', RECT_BASE, 'ordinal'),
    methods.RANGE_ORDINAL_COLOR
  )
  t.end()
})

test('visUtils.getTickCount', t => {
  t.ok(methods.getTickCount)
  t.throws(methods.getTickCount)
  t.same(
    methods.getTickCount('x', [0, 600]),
    6
  )
  t.same(
    methods.getTickCount('y', [500, 0]),
    6
  )
  t.end()
})

test('visUtils.getD3Scale', t => {
  t.ok(methods.getD3Scale)
  t.throws(methods.getD3Scale)
  t.same(
    typeof methods.getD3Scale('linear'),
    'function'
  )
  t.end()
})

test('visUtils.getD3Scale', t => {
  t.ok(methods.getD3Scale)
  t.throws(methods.getD3Scale)
  t.same(
    typeof methods.getD3Scale('linear'),
    'function'
  )
  t.end()
})

test('visUtils.getScale', t => {
  t.ok(methods.getScale)
  const scaleOrdinal = methods.getScale('ordinal', ['a', 'b'], [0, 1])
  t.same(
    scaleOrdinal('a'),
    0.25
  )
  const scaleLinear1 = methods.getScale('linear', [0, 100], [0, 1], 10)
  t.same(
    scaleLinear1(50),
    0.5
  )
  const scaleLinear2 = methods.getScale('linear', [100, 100], [0, 1])
  t.same(
    scaleLinear2(50),
    0.5
  )
  t.end()
})
