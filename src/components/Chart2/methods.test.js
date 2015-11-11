
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
    'number'
  )
})
test('Chart2.getTypeFromArray, empty array', () => {
  assert.deepEqual(
    methods.getTypeFromArray(),
    'number'
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
test('Chart2.addTypesToParams', () => {
  const params = { x: { data: [ 1, 2, 3 ] }, y: { data: [ 'a', 'b', 'c' ] } }
  const newParams = methods.addTypesToParams(params)
  assert.deepEqual(
    newParams,
    {
      x: {data: [1, 2, 3], type: 'number'},
      y: {data: ['a', 'b', 'c'], type: 'string'},
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
test('Chart2.runMethodOnParams', () => {
  const params = { x: { data: [ 1, 2, 3 ] }, y: { data: [ 'a', 'b', 'c' ] } }
  const newParams = methods.runMethodOnParams(
    'type',
    methods.getTypeFromArray,
    params
  )
  assert.deepEqual(
    newParams,
    {
      x: {data: [1, 2, 3], type: 'number'},
      y: {data: ['a', 'b', 'c'], type: 'string'},
    }
  )
})
