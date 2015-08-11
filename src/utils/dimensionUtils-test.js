
import test from 'tape'

import {rectBase} from './rectUtils'
import * as dimUtils from './dimensionUtils'

test('dimUtils.mergeRanges', t => {
  t.ok(dimUtils.mergeRanges)
  t.deepEqual(
    dimUtils.mergeRanges({x: {}}, {width: 100}),
    {x: {range: [0, 100]}}
  )
  t.deepEqual(
    dimUtils.mergeRanges({y: {}}, {height: 100}),
    {y: {range: [0, 100]}}
  )
  t.end()
})

test('dimUtils.getScaleForType', t => {
  t.ok(dimUtils.getScaleForType)
  t.equal(typeof dimUtils.getScaleForType('linear'), 'function')
  t.throws(dimUtils.getScaleForType)
  t.end()
})

test('dimUtils.getScaleForDimension', t => {
  t.ok(dimUtils.getScaleForDimension)
  t.equal(typeof dimUtils.getScaleForDimension(dimUtils.DIMENSION_BASE), 'function')
  t.end()
})

test('dimUtils.mergeScales', t => {
  t.ok(dimUtils.mergeScales)
  t.equal(
    typeof dimUtils.mergeScales({x: dimUtils.DIMENSION_BASE}).x.scale,
    'function'
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
    [0, 0]
  )
  t.deepEqual(
    dimUtils.getRange('color', {}, rectBase),
    dimUtils.RANGE_LINEAR_COLOR
  )
  t.throws(dimUtils.getRange)
  t.end()
})
