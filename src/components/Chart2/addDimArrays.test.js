
import {it as test} from 'mocha'
import assert from 'assert'
import _ from 'lodash'

import * as methods from './addDimArrays'
import {ACCESSORS_GROUPS} from './constants'

const data = [
  {p0: -1, p1: 1, p2: 'a', p3: new Date(2015, 1, 1)},
  {p0: -2, p1: 2, p2: 'b', p3: new Date(2015, 1, 2)},
  {p0: -3, p1: undefined, p2: 'c', p3: new Date(2015, 1, 3)},
]
const layerData = [
  {p10: 10, p2: 'aa', p3: new Date(2010, 1, 1)},
  {p10: 20, p2: 'bb', p3: new Date(2010, 2, 1)},
  {p10: 30, p2: 'cc', p3: new Date(2010, 3, 1)},
]
const props = {
  data,
  x0: 'p0',
  x: 'p1',
  y: 'p2',
  color: 'p3',
  layers: [
    {
      data: layerData,
      x: 'p10',
      y: 'p2',
      color: 'p3',
    },
  ],
}
test('Chart2.getDimArraysForLayer', () => {
  assert.deepEqual(
    methods.getDimArraysForLayer(props),
    {
      color: [
        new Date(2015, 1, 1), new Date(2015, 1, 2), new Date(2015, 1, 3),
      ],
      x0: [-1, -2, -3],
      x: [1, 2],
      y: ['a', 'b', 'c'],
    }
  )
})
test('Chart2.getDimArraysForProps', () => {
  assert.deepEqual(
    methods.getDimArraysForProps(props),
    {
      color: [
        new Date(2015, 1, 1), new Date(2015, 1, 2), new Date(2015, 1, 3),
        new Date(2010, 1, 1), new Date(2010, 2, 1), new Date(2010, 3, 1),
      ],
      x0: [-1, -2, -3],
      x: [1, 2, 10, 20, 30],
      y: ['a', 'b', 'c', 'aa', 'bb', 'cc'],
    }
  )
})
test('Chart2.omitGroups', () => {
  assert.deepEqual(
    methods.omitGroups(
      {
        color: [
          new Date(2015, 1, 1), new Date(2015, 1, 2), new Date(2015, 1, 3),
          new Date(2010, 1, 1), new Date(2010, 2, 1), new Date(2010, 3, 1),
        ],
        x0: [-1, -2, -3],
        x: [1, 2, 10, 20, 30],
        y: ['a', 'b', 'c', 'aa', 'bb', 'cc'],
      },
      ACCESSORS_GROUPS
    ),
    {
      color: [
        new Date(2015, 1, 1), new Date(2015, 1, 2), new Date(2015, 1, 3),
        new Date(2010, 1, 1), new Date(2010, 2, 1), new Date(2010, 3, 1),
      ],
    }
  )
})
test('Chart2.mergeDimArrays', () => {
  assert.deepEqual(
    methods.mergeDimArrays(
      {},
      {
        color: [
          new Date(2015, 1, 1), new Date(2015, 1, 2), new Date(2015, 1, 3),
          new Date(2010, 1, 1), new Date(2010, 2, 1), new Date(2010, 3, 1),
        ],
        x0: [-1, -2, -3],
        x: [1, 2, 10, 20, 30],
        y: ['a', 'b', 'c', 'aa', 'bb', 'cc'],
      }
    ),
    {
      color: [
        new Date(2015, 1, 1), new Date(2015, 1, 2), new Date(2015, 1, 3),
        new Date(2010, 1, 1), new Date(2010, 2, 1), new Date(2010, 3, 1),
      ],
      x: [1, 2, 10, 20, 30, -1, -2, -3],
      y: ['a', 'b', 'c', 'aa', 'bb', 'cc'],
    }
  )
})
test('Chart2.addDimArrays', () => {
  assert.deepEqual(
    methods.addDimArrays(props),
    _.assign({}, props, {
      colorArray: [
        new Date(2015, 1, 1), new Date(2015, 1, 2), new Date(2015, 1, 3),
        new Date(2010, 1, 1), new Date(2010, 2, 1), new Date(2010, 3, 1),
      ],
      xArray: [1, 2, 10, 20, 30, -1, -2, -3],
      yArray: ['a', 'b', 'c', 'aa', 'bb', 'cc'],
      dimensions: ['color', 'x', 'y'],
    })
  )
})
test('Chart2.addDimArrays -> missing data 1', () => {
  const localProps = {
    layers: [
      {data: [{x: 1}], x: 'x'},
    ],
    x: '',
  }
  assert.deepEqual(
    methods.addDimArrays(localProps),
    {
      layers: [{data: [{x: 1}], x: 'x'}],
      x: '',
      xArray: [1],
      dimensions: ['x'],
    }
  )
})
test('Chart2.addDimArrays -> missing data 2', () => {
  const localProps = {
    layers: [
      {x: 'x'},
    ],
    data: [{x: 1}],
    x: 'x',
  }
  assert.deepEqual(
    methods.addDimArrays(localProps),
    {
      layers: [ { x: 'x' } ],
      data: [ { x: 1 } ],
      x: 'x',
      xArray: [ 1 ],
      dimensions: [ 'x' ],
    }
  )
})
test('Chart2.addDimArrays -> missing data 3', () => {
  const localProps = {
    layers: [
      {x: 'x'},
    ],
    data: [{x: 1}],
    x: 'x',
    y: 'y',
  }
  assert.deepEqual(
    methods.addDimArrays(localProps),
    {
      layers: [ { x: 'x' } ],
      data: [ { x: 1 } ],
      x: 'x',
      y: 'y',
      xArray: [ 1 ],
      dimensions: [ 'x' ],
    }
  )
})
