
import {it as test} from 'mocha'
import assert from 'assert'

import * as methods from './methods'

test('Chart2.getParams', () => {
  assert.deepEqual(
    methods.dataValuesToParams({x: [1, 2, 3], y: [10, 11, 12]}),
    { x: { data: [ 1, 2, 3 ] }, y: { data: [ 10, 11, 12 ] } }
  )
})
test('Chart2.getTypeFromArray', () => {
  assert.deepEqual(
    methods.getTypeFromArray([1, 'string', 3, new Date()]),
    'linear'
  )
})
test('Chart2.getTypeFromArray, empty array', () => {
  assert.deepEqual(
    methods.getTypeFromArray(),
    'linear'
  )
})
test('Chart2.getDomainFromArray, type="linear"', () => {
  assert.deepEqual(
    methods.getDomainFromArray([1, 2, 3], 'linear'),
    [1, 3]
  )
  assert.deepEqual(
    methods.getDomainFromArray([1, 'a', 'b'], 'linear'),
    [1, 1]
  )
})
test('Chart2.getDomainFromArray, type="ordinal"', () => {
  assert.deepEqual(
    methods.getDomainFromArray(['a', 'a', 'b', 'c'], 'ordinal'),
    ['a', 'b', 'c']
  )
  assert.deepEqual(
    methods.getDomainFromArray([1, 'a', 'b'], 'ordinal'),
    [1, 'a', 'b']
  )
})
test('Chart2.addTypeToParams', () => {
  const params = { x: { data: [ 1, 2, 3 ] }, y: { data: [ 'a', 'b', 'c' ] }, plotRect: {} }
  const newParams = methods.addTypeToParams(params)
  assert.deepEqual(
    newParams,
    {
      x: {data: [1, 2, 3], type: 'linear'},
      y: {data: ['a', 'b', 'c'], type: 'ordinal'},
      plotRect: {},
    }
  )
  assert.notStrictEqual(
    params,
    newParams
  )
  assert.notStrictEqual(
    params.x,
    newParams.x
  )
})
test('Chart2.addDomainToParams', () => {
  const params = {
    x: {data: [1, 2, 3], type: 'linear'},
    y: {data: ['a', 'b', 'c'], type: 'ordinal'},
    plotRect: {},
  }
  const newParams = methods.addDomainToParams(params)
  assert.deepEqual(
    newParams,
    {
      x: {data: [1, 2, 3], type: 'linear', domain: [1, 3]},
      y: {data: ['a', 'b', 'c'], type: 'ordinal', domain: ['a', 'b', 'c']},
      plotRect: {},
    }
  )
})
test('Chart2.addRangeToParams', () => {
  const params = {
    x: {data: [1, 2, 3], type: 'linear'},
    y: {data: ['a', 'b', 'c'], type: 'ordinal'},
    plotRect: {x: 0, y: 0, width: 100, height: 100},
  }
  const newParams = methods.addRangeToParams(params)
  assert.deepEqual(
    newParams,
    {
      x: {data: [1, 2, 3], type: 'linear', range: [0, 100]},
      y: {data: ['a', 'b', 'c'], type: 'ordinal', range: [100, 0]},
      plotRect: {x: 0, y: 0, width: 100, height: 100},
    }
  )
})
test('Chart2.addTickCountToParams', () => {
  const params = {
    x: {data: [1, 2, 3], range: [0, 100]},
    y: {data: ['a', 'b', 'c'], range: [100, 0]},
    plotRect: {},
  }
  const newParams = methods.addTickCountToParams(params)
  assert.deepEqual(
    newParams,
    {
      x: {data: [1, 2, 3], range: [0, 100], tickCount: 1},
      y: {data: ['a', 'b', 'c'], range: [100, 0], tickCount: 1},
      plotRect: {},
    }
  )
})
