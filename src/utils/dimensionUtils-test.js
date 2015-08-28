
import test from 'tape'
import _ from 'lodash'

import {rectBase} from './rectUtils'
import * as dimUtils from './dimensionUtils'

test('dimUtils.getType', t => {
  t.deepEqual(
    dimUtils.getType([{a: 1}, {a: 2}], 'a'),
    'linear'
  )
  t.end()
})

test('dimUtils.getColorScale', t => {
  t.deepEqual(
    dimUtils.getColorScale('ordinal', [1, 2, 3]).domain(),
    [1, 2, 3]
  )
  t.deepEqual(
    dimUtils.getColorScale('linear', [1, 3]).domain(),
    [1, 3]
  )
  t.end()
})

test('dimUtils.getDomain', t => {
  t.deepEqual(
    dimUtils.getDomain('ordinal', [{t: 'a'}, {t: 'b'}], 't'),
    ['a', 'b']
  )
  t.deepEqual(
    dimUtils.getDomain('linear', [{t: 1}, {t: 2}], 't'),
    [1, 2]
  )
  t.end()
})

test('dimUtils.getAxisScale', t => {
  const scale = dimUtils.getAxisScale('linear', [0, 10], [])
  t.deepEqual(
    typeof scale,
    'function'
  )
  t.deepEqual(
    _.isArray(scale.ticks(2)),
    true
  )
  t.end()
})

test('dimUtils.getRange', t => {
  t.ok(dimUtils.getRange)
  t.deepEqual(
    dimUtils.getRange('x', {}, rectBase),
    [0, 0]
  )
  t.deepEqual(
    dimUtils.getRange('y', {}, rectBase),
    [0, 0],
    'array of numbers'
  )
  t.deepEqual(
    dimUtils.getRange('color', {}, rectBase),
    dimUtils.RANGE_LINEAR_COLOR
  )
  t.throws(dimUtils.getRange)
  t.end()
})

test('dimUtils.getScaleForType', t => {
  t.ok(dimUtils.getScaleForType)
  t.equal(typeof dimUtils.getScaleForType('linear'), 'function')
  t.throws(dimUtils.getScaleForType)
  t.end()
})
