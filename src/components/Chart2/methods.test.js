
import {it as test} from 'mocha'
import assert from 'assert'

import * as methods from './methods'

const data = [
  {x: 1, x0: -10, y: 'a'}, {x: 2, x0: -10, y0: 'b'}, {x: 3}, {x: 4},
]
const data2 = [
  {otherValue: 'a'}, {otherValue2: 'b'},
]
const props = {
  data,
  layers: [
    {
      data: data2,
      y: 'otherValue',
      y0: 'otherValue2',
    },
  ],
  x: 'x',
  x0: 'x0',
}

test('Chart2.getDefinedAccessors', () => {
  assert.deepEqual(
    methods.getDefinedAccessors(props),
    {x: 'x', x0: 'x0'}
  )
  assert.deepEqual(
    methods.getDefinedAccessors({}),
    {}
  )
})
test('Chart2.getDataValuesFromData', () => {
  assert.deepEqual(
    methods.getDataValuesFromData(data, {x: 'x', x0: 'x0'}),
    {x: [1, 2, 3, 4], x0: [-10, -10]}
  )
  assert.deepEqual(
    methods.getDataValuesFromData(undefined, {x: 'x', x0: 'x0'}),
    {x: [], x0: []}
  )
  assert.deepEqual(
    methods.getDataValuesFromData(data, undefined),
    {}
  )
})
test('Chart2.getDataValuesFromLayers', () => {
  assert.deepEqual(
    methods.getDataValuesFromLayers(props, {x: 'x', x0: 'x0'}),
    { x: [], x0: [], y: [ 'a' ], y0: [ 'b' ] }
  )
  assert.deepEqual(
    methods.getDataValuesFromLayers(
      props,
      {x: 'x', x0: 'x0'},
      {x: [1, 2, 3], y: 'extra'}
    ),
    {x: [1, 2, 3], x0: [], y: ['extra', 'a'], y0: ['b']}
  )
})
test('Chart2.getMergedAccessorGroup', () => {
  assert.deepEqual(
    methods.getMergedAccessorGroup(
      {x: [1, 2, 3], x0: ['a', 'b', 'c'], y: [10, 11, 12]},
      ['x', 'x0']
    ),
    [1, 2, 3, 'a', 'b', 'c']
  )
  assert.deepEqual(
    methods.getMergedAccessorGroup(
      {x: [1, 2, 3], x0: ['a', 'b', 'c']},
      ['x', 'x0', 'y']
    ),
    [1, 2, 3, 'a', 'b', 'c']
  )
  assert.deepEqual(
    methods.getMergedAccessorGroup(
      {},
      ['x', 'x0', 'y']
    ),
    []
  )
})
test('Chart2.mergeDataValues', () => {
  assert.deepEqual(
    methods.mergeDataValues({x: [1, 2, 3], x0: ['a', 'b', 'c']}),
    {x: [ 1, 2, 3, 'a', 'b', 'c']}
  )
})

test('Chart2.getDataValues', () => {
  assert.deepEqual(
    methods.getDataValues(props),
    {x: [1, 2, 3, 4, -10, -10], y: ['a', 'b']}
  )
})
