
import {it as test} from 'mocha'
import assert from 'assert'

import * as methods from './'

test('utils.notPlotNumber NaN', () => {
  assert.equal(
    methods.notPlotNumber(NaN),
    true
  )
})
test('utils.notPlotNumber "a"', () => {
  assert.equal(
    methods.notPlotNumber('a'),
    true
  )
})
test('utils.notPlotNumber undefined', () => {
  assert.equal(
    methods.notPlotNumber(undefined),
    true
  )
})
test('utils.notPlotNumber 32', () => {
  assert.equal(
    methods.notPlotNumber(32),
    false
  )
})

test('utils.isPlotNumber NaN', () => {
  assert.equal(
    methods.isPlotNumber(NaN),
    false
  )
})
test('utils.isPlotNumber "a"', () => {
  assert.equal(
    methods.isPlotNumber('a'),
    false
  )
})
test('utils.isPlotNumber undefined', () => {
  assert.equal(
    methods.isPlotNumber(undefined),
    false
  )
})
test('utils.isPlotNumber 32', () => {
  assert.equal(
    methods.isPlotNumber(32),
    true
  )
})
