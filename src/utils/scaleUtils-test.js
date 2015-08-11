
import test from 'tape'

import {rectBase} from './rectUtils'
import * as scaleUtils from './scaleUtils'

test('scaleUtils.mergeRanges', t => {
  t.ok(scaleUtils.mergeRanges)
  t.deepEqual(
    scaleUtils.mergeRanges({x: {}}, {width: 100}),
    {x: {range: [0, 100]}}
  )
  t.deepEqual(
    scaleUtils.mergeRanges({y: {}}, {height: 100}),
    {y: {range: [0, 100]}}
  )
  t.end()
})

test('scaleUtils.getScaleForType', t => {
  t.ok(scaleUtils.getScaleForType)
  t.equal(typeof scaleUtils.getScaleForType('linear'), 'function')
  t.throws(scaleUtils.getScaleForType)
  t.end()
})

test('scaleUtils.getScaleForDimension', t => {
  t.ok(scaleUtils.getScaleForDimension)
  t.equal(typeof scaleUtils.getScaleForDimension(scaleUtils.DIMENSION_BASE), 'function')
  t.end()
})

test('scaleUtils.mergeScales', t => {
  t.ok(scaleUtils.mergeScales)
  t.equal(
    typeof scaleUtils.mergeScales({x: scaleUtils.DIMENSION_BASE}).x.scale,
    'function'
  )
  t.end()
})

test('scaleUtils.getRange', t => {
  t.ok(scaleUtils.getRange)
  t.deepEqual(
    scaleUtils.getRange('x', {}, rectBase),
    [0, 0]
  )
  t.deepEqual(
    scaleUtils.getRange('y', {}, rectBase),
    [0, 0]
  )
  t.deepEqual(
    scaleUtils.getRange('color', {}, rectBase),
    scaleUtils.RANGE_LINEAR_COLOR
  )
  t.throws(scaleUtils.getRange)
  t.end()
})
