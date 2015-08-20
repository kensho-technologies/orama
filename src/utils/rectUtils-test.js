
import test from 'tape'

import * as rectUtils from './rectUtils'

test('rectUtils.rectBase, rectUtils.marginBase', t => {
  t.ok(rectUtils.rectBase)
  t.ok(rectUtils.marginBase)
  t.end()
})

test('rectUtils.marginInset', t => {
  t.ok(rectUtils.marginInset)
  t.deepEqual(
    rectUtils.marginInset({}, {}),
    {x: 0, y: 0, width: 0, height: 0}
  )
  var rect = rectUtils.marginInset({}, {width: 100, height: 100})
  t.deepEqual(
    rect,
    {x: 0, y: 0, width: 100, height: 100}
  )
  var rect2 = rectUtils.marginInset(
    {left: 10, top: 10},
    {width: 100, height: 100}
  )
  t.deepEqual(
    rect2,
    {x: 10, y: 10, width: 90, height: 90}
  )
  t.end()
})

test('rectUtils.inset', t => {
  t.ok(rectUtils.inset)
  t.deepEqual(
    rectUtils.inset(10, {width: 100, height: 100}),
    {x: 10, y: 10, width: 80, height: 80}
  )
  t.end()
})

test('rectUtils.getMaxX', t => {
  t.ok(rectUtils.getMaxX)
  t.deepEqual(rectUtils.getMaxX({}), 0)
  t.deepEqual(
    rectUtils.getMaxX({ x: 10, width: 100}),
    110
  )
  t.end()
})

test('rectUtils.getMaxY', t => {
  t.ok(rectUtils.getMaxY)
  t.deepEqual(rectUtils.getMaxY({}), 0)
  t.deepEqual(
    rectUtils.getMaxY({ y: 10, height: 100}),
    110
  )
  t.end()
})

test('rectUtils.getDomainX', t => {
  t.deepEqual(
    rectUtils.getDomainX(),
    [0, 0]
  )
  t.deepEqual(
    rectUtils.getDomainX({x: 50, width: 100}),
    [50, 150]
  )
  t.end()
})

test('rectUtils.getDomainY', t => {
  t.deepEqual(
    rectUtils.getDomainY(),
    [0, 0]
  )
  t.deepEqual(
    rectUtils.getDomainY({y: 50, height: 100}),
    [50, 150]
  )
  t.end()
})
