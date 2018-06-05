// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test, describe} from 'mocha'

import splitBy from '../../src/utils/splitBy'

describe('utils/splitBy', () => {
  test('empty array', () => {
    assert.deepEqual(splitBy([], Boolean), [[]])
  })
  test('splits by the provided iteratee', () => {
    assert.deepEqual(splitBy(['foo', 'bar', 1, null, 2, 3], d => d === null), [
      ['foo', 'bar', 1],
      [2, 3],
    ])
  })
  test('no splits', () => {
    assert.deepEqual(splitBy(['foo', 'blah', 1, 2, 3], d => d === null), [['foo', 'blah', 1, 2, 3]])
  })
  test('multiple splits', () => {
    assert.deepEqual(splitBy([1, 2, false, 3, 4, false, 5, 6], d => !d), [[1, 2], [3, 4], [5, 6]])
  })

  test('beginning split', () => {
    assert.deepEqual(splitBy([false, 1, 2, 3], d => !d), [[], [1, 2, 3]])
  })
  test('ending split', () => {
    assert.deepEqual(splitBy([1, 2, 3, false], d => !d), [[1, 2, 3], []])
  })
})
