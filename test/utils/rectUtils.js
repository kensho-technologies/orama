// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'

import {
  inset,
  getMaxX,
  getMaxY,
  getMidX,
  getMidY,
  getRangeX,
  getRangeY,
  marginBase,
  marginInset,
  rectBase,
} from '../../src/utils/rectUtils'

test('rectUtils.rectBase, rectUtils.marginBase', () => {
  assert(rectBase)
  assert(marginBase)
})

test('rectUtils.marginInset', () => {
  assert(marginInset)
  assert.deepEqual(marginInset({}, {}), {x: 0, y: 0, width: 0, height: 0})
  const rect = marginInset({}, {width: 100, height: 100})
  assert.deepEqual(rect, {x: 0, y: 0, width: 100, height: 100})
  const rect2 = marginInset({left: 10, top: 10}, {width: 100, height: 100})
  assert.deepEqual(rect2, {x: 10, y: 10, width: 90, height: 90})
})

test('rectUtils.inset', () => {
  assert(inset)
  assert.deepEqual(inset(10, {width: 100, height: 100}), {
    x: 10,
    y: 10,
    width: 80,
    height: 80,
  })
})

test('rectUtils.getMaxX', () => {
  assert(getMaxX)
  assert.deepEqual(getMaxX({}), 0)
  assert.deepEqual(getMaxX({x: 10, width: 100}), 110)
})

test('rectUtils.getMaxY', () => {
  assert(getMaxY)
  assert.deepEqual(getMaxY({}), 0)
  assert.deepEqual(getMaxY({y: 10, height: 100}), 110)
})

test('rectUtils.getRangeX', () => {
  assert.deepEqual(getRangeX(), [0, 0])
  assert.deepEqual(getRangeX({x: 50, width: 100}), [50, 150])
})

test('rectUtils.getRangeY', () => {
  assert.deepEqual(getRangeY(), [0, 0])
  assert.deepEqual(getRangeY({y: 50, height: 100}), [150, 50])
})

test('rectUtils.getMidX', () => {
  assert(getMidX)
  assert.deepEqual(getMidX({}), 0)
  assert.deepEqual(getMidX({x: 10, width: 100}), 60)
})

test('rectUtils.getMidY', () => {
  assert(getMidY)
  assert.deepEqual(getMidY({}), 0)
  assert.deepEqual(getMidY({y: 10, height: 100}), 60)
})
