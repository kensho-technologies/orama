// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'

import isDatum from '../../src/utils/isDatum'

test('utils/isDatum NaN', () => {
  assert.equal(isDatum(NaN), false)
})

test('utils/isDatum "a"', () => {
  assert.equal(isDatum('a'), true)
})

test('utils/isDatum undefined', () => {
  assert.equal(isDatum(undefined), false)
})

test('utils/isDatum 32', () => {
  assert.equal(isDatum(32), true)
})
