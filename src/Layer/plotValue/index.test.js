
import {it as test} from 'mocha'
import assert from 'assert'

import {getScaleKeyByHash} from './'
import {plotValue} from './'

test('Chart/plotValue.getScaleKeyByHash', () => {
  const actual = getScaleKeyByHash({}, 'x0')
  const expected = 'x'
  assert.deepEqual(actual, expected)
})
test('Chart/plotValue scale defined', () => {
  const props = {xScale: d => d, x: 'x'}
  const actual = plotValue(props, {x: 10}, 'x')
  const expected = 10
  assert.deepEqual(actual, expected)
})
test('Chart/plotValue value defined', () => {
  const props = {xValue: 20}
  const actual = plotValue(props, 10, 'x')
  const expected = 20
  assert.deepEqual(actual, expected)
})
test('Chart/plotValue map undefined', () => {
  const actual = plotValue({}, 10, 'x', 20)
  const expected = 20
  assert.deepEqual(actual, expected)
})
