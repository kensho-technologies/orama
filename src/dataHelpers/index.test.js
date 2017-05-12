// Copyright 2017 Kensho Technologies, Inc.

import {it as test} from 'mocha'
import assert from 'assert'

import * as methods from './'

test('dataHelpers.flow', () => {
  assert.deepEqual(
    methods.flow(
      10,
      d => d - 5,
      d => d * 100
    ),
    500
  )
})
test('dataHelpers.flow, no argument', () => {
  assert.deepEqual(
    methods.flow(),
    undefined
  )
})
test('dataHelpers.flow, one argument', () => {
  assert.deepEqual(
    methods.flow(
      10
    ),
    10
  )
})

test('dataHelpers.runTransArg', () => {
  assert.deepEqual(
    methods.runTransArg(
      {d: 'a + 1', c: 'c * 2'},
      {a: 1, b: 2, c: 3},
    ),
    {d: 2, c: 6}
  )
})
test('dataHelpers.transMapFunc', () => {
  assert.deepEqual(
    methods.transMapFunc({d: 'a + 1', c: 'c * 2'})({a: 1, b: 2, c: 3}),
    {a: 1, b: 2, d: 2, c: 6},
  )
})
test('dataHelpers.trans', () => {
  assert.deepEqual(
    methods.trans({d: 'a + 1', c: 'c * 2'})([{a: 1, b: 2, c: 3}]),
    [{a: 1, b: 2, d: 2, c: 6}],
  )
})
