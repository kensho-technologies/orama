// Copyright 2018 Kensho Technologies, LLC.

import {it as test} from 'mocha'
import assert from 'assert'

import * as rectUtils from './'

test('rectUtils.rectBase, rectUtils.marginBase', () => {
  assert(rectUtils.rectBase)
  assert(rectUtils.marginBase)
})

test('rectUtils.marginInset', () => {
  assert(rectUtils.marginInset)
  assert.deepEqual(
    rectUtils.marginInset({}, {}),
    {x: 0, y: 0, width: 0, height: 0}
  )
  var rect = rectUtils.marginInset({}, {width: 100, height: 100})
  assert.deepEqual(
    rect,
    {x: 0, y: 0, width: 100, height: 100}
  )
  var rect2 = rectUtils.marginInset(
    {left: 10, top: 10},
    {width: 100, height: 100}
  )
  assert.deepEqual(
    rect2,
    {x: 10, y: 10, width: 90, height: 90}
  )
})

test('rectUtils.inset', () => {
  assert(rectUtils.inset)
  assert.deepEqual(
    rectUtils.inset(10, {width: 100, height: 100}),
    {x: 10, y: 10, width: 80, height: 80}
  )
})

test('rectUtils.getMaxX', () => {
  assert(rectUtils.getMaxX)
  assert.deepEqual(rectUtils.getMaxX({}), 0)
  assert.deepEqual(
    rectUtils.getMaxX({ x: 10, width: 100}),
    110
  )
})

test('rectUtils.getMaxY', () => {
  assert(rectUtils.getMaxY)
  assert.deepEqual(rectUtils.getMaxY({}), 0)
  assert.deepEqual(
    rectUtils.getMaxY({ y: 10, height: 100}),
    110
  )
})

test('rectUtils.getRangeX', () => {
  assert.deepEqual(
    rectUtils.getRangeX(),
    [0, 0]
  )
  assert.deepEqual(
    rectUtils.getRangeX({x: 50, width: 100}),
    [50, 150]
  )
})

test('rectUtils.getRangeY', () => {
  assert.deepEqual(
    rectUtils.getRangeY(),
    [0, 0]
  )
  assert.deepEqual(
    rectUtils.getRangeY({y: 50, height: 100}),
    [150, 50]
  )
})

test('rectUtils.getMidX', () => {
  assert(rectUtils.getMidX)
  assert.deepEqual(rectUtils.getMidX({}), 0)
  assert.deepEqual(
    rectUtils.getMidX({ x: 10, width: 100}),
    60
  )
})

test('rectUtils.getMidY', () => {
  assert(rectUtils.getMidY)
  assert.deepEqual(rectUtils.getMidY({}), 0)
  assert.deepEqual(
    rectUtils.getMidY({ y: 10, height: 100}),
    60
  )
})
