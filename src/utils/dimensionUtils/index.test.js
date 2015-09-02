
import {it as test} from 'mocha'
import assert from 'assert'
import _ from 'lodash'

import {rectBase} from '../rectUtils'
import * as dimUtils from '../dimensionUtils'

test('dimUtils.getType', () => {
  assert.deepEqual(
    dimUtils.getType([{a: 1}, {a: 2}], 'a'),
    'linear'
  )
})

test('dimUtils.getColorScale', () => {
  assert.deepEqual(
    dimUtils.getColorScale('ordinal', [1, 2, 3]).domain(),
    [1, 2, 3]
  )
  assert.deepEqual(
    dimUtils.getColorScale('linear', [1, 3]).domain(),
    [1, 3]
  )
})

test('dimUtils.getDomain', () => {
  assert.deepEqual(
    dimUtils.getDomain('ordinal', [{t: 'a'}, {t: 'b'}], 't'),
    ['a', 'b']
  )
  assert.deepEqual(
    dimUtils.getDomain('linear', [{t: 1}, {t: 2}], 't'),
    [1, 2]
  )
})

test('dimUtils.getAxisScale', () => {
  const scale = dimUtils.getAxisScale('linear', [0, 10], [])
  assert.deepEqual(
    typeof scale,
    'function'
  )
  assert.deepEqual(
    _.isArray(scale.ticks(2)),
    true
  )
})

test('dimUtils.getRange', () => {
  assert(dimUtils.getRange)
  assert.deepEqual(
    dimUtils.getRange('x', {}, rectBase),
    [0, 0]
  )
  assert.deepEqual(
    dimUtils.getRange('y', {}, rectBase),
    [0, 0],
    'array of numbers'
  )
  assert.deepEqual(
    dimUtils.getRange('color', {}, rectBase),
    dimUtils.RANGE_LINEAR_COLOR
  )
  assert.throws(dimUtils.getRange)
})

test('dimUtils.getScaleForType', () => {
  assert(dimUtils.getScaleForType)
  assert.strictEqual(typeof dimUtils.getScaleForType('linear'), 'function')
  assert.throws(dimUtils.getScaleForType)
})
