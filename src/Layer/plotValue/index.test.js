
import {it as test} from 'mocha'
import assert from 'assert'

import * as methods from './'

test('Chart.getScaleKeyByHash', () => {
  assert.deepEqual(
    methods.getScaleKeyByHash({}, 'x0'),
    'x'
  )
})
test('Chart.getScaleKey', () => {
  assert.deepEqual(
    methods.getScaleKey({}, 'x0'),
    'x'
  )
})
test('Chart.plotValue, scale defined', () => {
  assert.deepEqual(
    methods.plotValue(
      {xScale: d => d, x: 'x'},
      {x: 10},
      'x',
    ),
    10
  )
})
test('Chart.plotValue, value defined', () => {
  assert.deepEqual(
    methods.plotValue(
      {xValue: 20},
      10,
      'x',
    ),
    20
  )
})
test('Chart.plotValue, map undefined', () => {
  assert.deepEqual(
    methods.plotValue(
      {},
      10,
      'x',
      20,
    ),
    20
  )
})
