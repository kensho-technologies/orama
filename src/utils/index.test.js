// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'

import {isDatum, isPlotNumber, notPlotNumber} from '.'

test('utils.notPlotNumber NaN', () => {
  assert.equal(notPlotNumber(NaN), true)
})
test('utils.notPlotNumber "a"', () => {
  assert.equal(notPlotNumber('a'), true)
})
test('utils.notPlotNumber undefined', () => {
  assert.equal(notPlotNumber(undefined), true)
})
test('utils.notPlotNumber 32', () => {
  assert.equal(notPlotNumber(32), false)
})

test('utils.isPlotNumber NaN', () => {
  assert.equal(isPlotNumber(NaN), false)
})
test('utils.isPlotNumber "a"', () => {
  assert.equal(isPlotNumber('a'), false)
})
test('utils.isPlotNumber undefined', () => {
  assert.equal(isPlotNumber(undefined), false)
})
test('utils.isPlotNumber 32', () => {
  assert.equal(isPlotNumber(32), true)
})

test('utils.isDatum NaN', () => {
  assert.equal(isDatum(NaN), false)
})
test('utils.isDatum "a"', () => {
  assert.equal(isDatum('a'), true)
})
test('utils.isDatum undefined', () => {
  assert.equal(isDatum(undefined), false)
})
test('utils.isDatum 32', () => {
  assert.equal(isDatum(32), true)
})
