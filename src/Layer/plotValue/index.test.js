
import {it as test} from 'mocha'
import assert from 'assert'

import {getScaleKeyByHash} from './'
import {plotValue} from './'

test('Chart/plotValue.getScaleKeyByHash', () => {
  const actual = getScaleKeyByHash({}, 'x0')
  const expected = 'x'
  assert.deepEqual(actual, expected)
})

test('Chart/plotValue, ${key}Value on the props', () => {
  const props = {
    xScale: () => 'mapped',
    x: 'x',
    xValue: 'a',
  }
  const actual = plotValue(props, {x: 10, xValue: 20}, 'x')
  const expected = 'a'
  assert.deepEqual(actual, expected)
})
test('Chart/plotValue, scaled data accessed with the accessor', () => {
  const props = {
    xScale: () => 'mapped',
    x: 'x',
    xValue: NaN,
  }
  const actual = plotValue(props, {x: 10, xValue: 20}, 'x')
  const expected = 'mapped'
  assert.deepEqual(actual, expected)
})
test('Chart/plotValue, ${key}Value on the data', () => {
  const props = {
    xScale: () => null,
    x: 'x',
    xValue: NaN,
  }
  const actual = plotValue(props, {x: 10, xValue: 20}, 'x')
  const expected = 20
  assert.deepEqual(actual, expected)
})
test('Chart/plotValue, ${key}Value on the data', () => {
  const props = {
    x: 'x',
  }
  const actual = plotValue(props, {x: 10, xValue: 20}, 'x')
  const expected = 20
  assert.deepEqual(actual, expected)
})
test('Chart/plotValue, ${key}Value on the data', () => {
  const props = {
    x: 'x',
  }
  const actual = plotValue(props, {x: 10}, 'x')
  const expected = undefined
  assert.deepEqual(actual, expected)
})

test('Chart/plotValue, all undefined', () => {
  const actual = plotValue({}, 10, 'x', 20)
  const expected = 20
  assert.deepEqual(actual, expected)
})
