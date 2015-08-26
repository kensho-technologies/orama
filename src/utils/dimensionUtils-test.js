
import test from 'tape'

import {rectBase} from './rectUtils'
import * as dimUtils from './dimensionUtils'

test('dimUtils.getRange', t => {
  t.ok(dimUtils.getRange)
  t.deepEqual(
    dimUtils.getRange('x', {}, rectBase),
    [0, 0]
  )
  t.deepEqual(
    dimUtils.getRange('y', {}, rectBase),
    [0, 0]
  )
  t.deepEqual(
    dimUtils.getRange('color', {}, rectBase),
    dimUtils.RANGE_LINEAR_COLOR
  )
  t.throws(dimUtils.getRange)
  t.end()
})

test('dimUtils.getScaleForDimension', t => {
  t.ok(dimUtils.getScaleForDimension)
  t.equal(typeof dimUtils.getScaleForDimension(dimUtils.DIMENSION_BASE), 'function')
  t.end()
})

test('dimUtils.getScaleForType', t => {
  t.ok(dimUtils.getScaleForType)
  t.equal(typeof dimUtils.getScaleForType('linear'), 'function')
  t.throws(dimUtils.getScaleForType)
  t.end()
})
