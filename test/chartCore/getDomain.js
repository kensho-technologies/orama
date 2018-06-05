// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'

import getDomain from '../../src/chartCore/getDomain'

test('chartCore/getDomain', () => {
  const props = {
    xArray: [1, 2, 3, 4],
    yArray: ['a', 'b', 'c'],
    fillArray: [new Date(2015, 1), new Date(2015, 2), new Date(2015, 3)],
    xType: 'linear',
    yType: 'ordinal',
    fillType: 'time',
  }
  assert.deepEqual(getDomain(props, 'x'), [1, 4])
  assert.deepEqual(getDomain(props, 'y'), ['a', 'b', 'c'])
  assert.deepEqual(getDomain(props, 'fill'), [new Date(2015, 1), new Date(2015, 3)])
})

test('chartCore/getDomain zeroBased', () => {
  const props = {
    xArray: [1, 2, 3, 4],
    xType: 'linear',
    xZeroBased: true,
  }
  assert.deepEqual(getDomain(props, 'x'), [0, 4])
})
