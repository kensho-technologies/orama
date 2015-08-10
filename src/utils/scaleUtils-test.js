
import test from 'tape'

import * as scaleUtils from './scaleUtils'

test('scaleUtils.scaleForType', t => {
  t.ok(scaleUtils.scaleForType)
  t.equal(typeof scaleUtils.scaleForType('linear'), 'function')
  t.throws(scaleUtils.scaleForType)
  t.end()
})

test('scaleUtils.scaleForDimension', t => {
  t.ok(scaleUtils.scaleForDimension)
  t.equal(typeof scaleUtils.scaleForDimension(), 'function')
  t.end()
})

test('scaleUtils.getScales', t => {
  t.ok(scaleUtils.getScales)
  t.equal(typeof scaleUtils.getScales({}, {}), 'object')
  t.equal(typeof scaleUtils.getScales({x: {}}).x, 'function')
  t.equal(typeof scaleUtils.getScales({y: {}}).y, 'function')
  t.equal(typeof scaleUtils.getScales({color: {}}).color, 'function')
  t.end()
})
