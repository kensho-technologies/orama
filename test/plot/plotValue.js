// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'

import plotValue from '../../src/plot/plotValue'

test('plot/plotValue, <key>Value on the props', () => {
  const props = {
    xScale: () => 'mapped',
    x: 'x',
    xValue: 'a',
  }
  const actual = plotValue(props, {x: 10, xValue: 20}, undefined, 'x')
  const expected = 'a'
  assert.deepEqual(actual, expected)
})

test('plot/plotValue, scaled data accessed with the accessor', () => {
  const props = {
    xScale: () => 'mapped',
    x: 'x',
    xValue: NaN,
  }
  const actual = plotValue(props, {x: 10, xValue: 20}, undefined, 'x')
  const expected = 'mapped'
  assert.deepEqual(actual, expected)
})

test('plot/plotValue, <key>Value on the data 1', () => {
  const props = {
    xScale: () => null,
    x: 'prop1',
    xValue: NaN,
  }
  const actual = plotValue(props, {x: 10, xValue: 20}, undefined, 'x')
  const expected = 20
  assert.deepEqual(actual, expected)
})

test('plot/plotValue, <key>Value on the data 2', () => {
  const props = {
    x: 'prop1',
  }
  const actual = plotValue(props, {x: 10, xValue: 20}, undefined, 'x')
  const expected = 20
  assert.deepEqual(actual, expected)
})

test('plot/plotValue, <key>Value on the data 3', () => {
  const props = {
    x: 'x',
  }
  const actual = plotValue(props, {x: 10}, undefined, 'x')
  const expected = 10
  assert.deepEqual(actual, expected)
})

test('plot/plotValue, all undefined', () => {
  const actual = plotValue({}, 10, undefined, 'x', 20)
  const expected = 20
  assert.deepEqual(actual, expected)
})

test('plot/plotValue, function as value', () => {
  const actual = plotValue({xValue: (p, d, i) => i * 2}, {}, 1, 'x')
  const expected = 2
  assert.deepEqual(actual, expected)
})
