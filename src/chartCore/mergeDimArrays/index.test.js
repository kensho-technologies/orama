// Copyright 2017 Kensho Technologies, Inc.

import {it as test} from 'mocha'
import assert from 'assert'
import {ACCESSORS_GROUPS} from '../../chartCore/defaults'

import {omitGroups} from './'
import {mergeDimArrays} from './'

test('Chart/mergeDimArrays.omitGroups 1', () => {
  const dimArrays = {
    fill: [1, 2, 3],
    x: [1, 2, 3],
    x0: [1, 2, 3],
  }
  const actual = omitGroups(dimArrays, ACCESSORS_GROUPS)
  const expected = {
    fill: [1, 2, 3],
  }
  assert.deepEqual(actual, expected)
})

test('Chart/mergeDimArrays.mergeDimArrays 1', () => {
  const dimArrays = {
    fill: [1, 2, 3],
    x: [1, 2],
    x0: [3, 4],
  }
  const actual = mergeDimArrays(dimArrays, ACCESSORS_GROUPS)
  const expected = {
    fill: [1, 2, 3],
    x: [1, 2, 3, 4],
  }
  assert.deepEqual(actual, expected)
})
test('Chart/mergeDimArrays.mergeDimArrays 2', () => {
  const dimArrays = {
    fill: [1, 2, 3],
    x: [1, 2],
    x0: undefined,
    x1: [],
  }
  const actual = mergeDimArrays(dimArrays, ACCESSORS_GROUPS)
  const expected = {
    fill: [1, 2, 3],
    x: [1, 2],
  }
  assert.deepEqual(actual, expected)
})
