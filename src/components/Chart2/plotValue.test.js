
import {it as test} from 'mocha'
import assert from 'assert'

import * as methods from './plotValue'

test('Chart2.plotValue, map defined', () => {
  assert.deepEqual(
    methods.plotValue(
      {xMap: d => d},
      'x',
      10
    ),
    10
  )
})
test('Chart2.plotValue, value defined', () => {
  assert.deepEqual(
    methods.plotValue(
      {xValue: 20},
      'x',
      10
    ),
    20
  )
})
test('Chart2.plotValue, map undefined', () => {
  assert.deepEqual(
    methods.plotValue(
      {},
      'x',
      10,
      20
    ),
    20
  )
})
