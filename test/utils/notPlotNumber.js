// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'

import notPlotNumber from '../../src/utils/notPlotNumber'

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
