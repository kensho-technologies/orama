// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'

import {flow, runTransArg, trans, transMapFunc} from '../src/dataHelpers'

test('dataHelpers.flow', () => {
  assert.deepEqual(flow(10, d => d - 5, d => d * 100), 500)
})

test('dataHelpers.flow, no argument', () => {
  assert.deepEqual(flow(), undefined)
})

test('dataHelpers.flow, one argument', () => {
  assert.deepEqual(flow(10), 10)
})

test('dataHelpers.runTransArg', () => {
  assert.deepEqual(runTransArg({d: 'a + 1', c: 'c * 2'}, {a: 1, b: 2, c: 3}), {d: 2, c: 6})
})

test('dataHelpers.transMapFunc', () => {
  assert.deepEqual(transMapFunc({d: 'a + 1', c: 'c * 2'})({a: 1, b: 2, c: 3}), {
    a: 1,
    b: 2,
    d: 2,
    c: 6,
  })
})

test('dataHelpers.trans', () => {
  assert.deepEqual(trans({d: 'a + 1', c: 'c * 2'})([{a: 1, b: 2, c: 3}]), [
    {a: 1, b: 2, d: 2, c: 6},
  ])
})
