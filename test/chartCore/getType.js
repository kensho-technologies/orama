// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'

import getType, {toType} from '../../src/chartCore/getType'

test('chartCore/getType/toType', () => {
  assert.deepEqual(toType(), 'undefined')
  assert.deepEqual(toType([]), 'array')
  assert.deepEqual(toType({}), 'object')
  assert.deepEqual(toType(10), 'number')
  assert.deepEqual(toType('10'), 'string')
  assert.deepEqual(toType(new Date()), 'date')
})

test('chartCore/getType', () => {
  const props = {
    xArray: [1, 2, 'string', new Date()],
    yArray: ['a', 'b', 1, new Date()],
    fillArray: [new Date(), new Date(), 'a', 1],
  }
  assert.deepEqual(getType(props, 'x'), 'linear')
  assert.deepEqual(getType(props, 'y'), 'ordinal')
  assert.deepEqual(getType(props, 'fill'), 'time')
  assert.deepEqual(getType(props), undefined)
})
