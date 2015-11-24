
import {it as test} from 'mocha'
import assert from 'assert'

import * as methods from './'

test('Chart2.getScaleKeyByHash', () => {
  assert.deepEqual(
    methods.getScaleKeyByHash({}, 'x0'),
    'x'
  )
})
test('Chart2.getScaleKey', () => {
  assert.deepEqual(
    methods.getScaleKey({}, 'x0'),
    'x'
  )
})
test('Chart2.plotValue, scale defined', () => {
  assert.deepEqual(
    methods.plotValue(
      {xScale: d => d, x: 'x'},
      {x: 10},
      'x',
    ),
    10
  )
})
test('Chart2.plotValue, value defined', () => {
  assert.deepEqual(
    methods.plotValue(
      {xValue: 20},
      10,
      'x',
    ),
    20
  )
})
test('Chart2.plotValue, map undefined', () => {
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
