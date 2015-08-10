
import test from 'tape'

import * as rectUtils from './rectUtils'

test('rectBase and marginBse should exist', t => {
  t.ok(rectUtils.rectBase)
  t.ok(rectUtils.marginBase)
  t.end()
})

test('marginInsetRect should work', t => {
  t.ok(rectUtils.marginInsetRect)
  t.deepEqual(
    rectUtils.marginInsetRect({}, {}),
    {x: 0, y: 0, width: 0, height: 0}
  )
  var rect = rectUtils.marginInsetRect({}, {width: 100, height: 100})
  t.deepEqual(
    rect,
    {x: 0, y: 0, width: 100, height: 100}
  )
  var rect2 = rectUtils.marginInsetRect(
    {left: 10, top: 10},
    {width: 100, height: 100}
  )
  t.deepEqual(
    rect2,
    {x: 10, y: 10, width: 90, height: 90}
  )
  t.end()
})

test('getMaxX should work', t => {
  t.ok(rectUtils.getMaxX)
  t.deepEqual(rectUtils.getMaxX({}), 0)
  t.deepEqual(
    rectUtils.getMaxX({ x: 10, width: 100}),
    110
  )
  t.end()
})

test('getMaxY should work', t => {
  t.ok(rectUtils.getMaxY)
  t.deepEqual(rectUtils.getMaxY({}), 0)
  t.deepEqual(
    rectUtils.getMaxY({ y: 10, height: 100}),
    110
  )
  t.end()
})
