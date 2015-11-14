
import {it as test} from 'mocha'
import assert from 'assert'
import _ from 'lodash'

import * as methods from './methods'

test('Chart2.getTypeFromArray', () => {
  assert.deepEqual(
    methods.getTypeFromArray([1, 2, 'string', new Date()]),
    'linear'
  )
  assert.deepEqual(
    methods.getTypeFromArray(['a', 'b', 1, new Date()]),
    'ordinal'
  )
  assert.deepEqual(
    methods.getTypeFromArray([new Date(), new Date(), 'a', 1]),
    'time'
  )
  assert.deepEqual(
    methods.getTypeFromArray(),
    'linear'
  )
})
test('Chart2.addTypes', () => {
  const props = {
    fillArray: [
      new Date(2015, 1, 1), new Date(2015, 1, 2), new Date(2015, 1, 3),
    ],
    xArray: [1, 2, 10, 'a', 'b'],
    yArray: ['a', 'b', 'c'],
    dimensions: ['fill', 'x', 'y', 'other'],
    otherType: 'ordinal',
  }
  assert.deepEqual(
    methods.addTypes(props),
    _.assign({}, props, {
      fillType: 'time',
      xType: 'linear',
      yType: 'ordinal',
    })
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
})
test('Chart2.getDomainFromArray, type="time"', () => {
  assert.deepEqual(
    methods.getDomainFromArray(
      [new Date(2015, 1), new Date(2015, 2), new Date(2015, 3)],
      'time'
    ),
    [new Date(2015, 1), new Date(2015, 3)]
  )
})
test('Chart2.addDomains', () => {
  const props = {
    fillArray: [
      new Date(2015, 1), new Date(2015, 2), new Date(2015, 3),
    ],
    xArray: [1, 2, 10, 'a', 'b'],
    yArray: ['a', 'b', 'c'],
    dimensions: ['fill', 'x', 'y'],
    fillType: 'time',
    xType: 'linear',
    yType: 'ordinal',
  }
  assert.deepEqual(
    methods.addDomains(props),
    _.assign({}, props, {
      xDomain: [1, 10],
      yDomain: ['a', 'b', 'c'],
      fillDomain: [new Date(2015, 1), new Date(2015, 3)],
    })
  )
})
test('Chart2.addRanges', () => {
  const props = {
    plotRect: {x: 0, y: 0, width: 500, height: 500},
    dimensions: ['fill', 'x', 'y'],
    fillType: 'time',
    xType: 'linear',
    yType: 'ordinal',
  }
  assert.deepEqual(
    methods.addRanges(props),
    _.assign({}, props, {
      fillRange: ['#edf8b1', '#2c7fb8'],
      xRange: [0, 500],
      yRange: [500, 0],
    })
  )
})
test('Chart2.addTickCounts', () => {
  const props = {
    dimensions: ['fill', 'x', 'y'],
    fillRange: [0, 500],
    xRange: [0, 500],
    yRange: [500, 0],
  }
  assert.deepEqual(
    methods.addTickCounts(props),
    _.assign({}, props, {
      fillTickCount: 5,
      xTickCount: 5,
      yTickCount: 6,
    })
  )
})
test('Chart2.addScales', () => {
  const props = {
    dimensions: ['fill', 'x', 'y'],
    fillType: 'time',
    xType: 'linear',
    yType: 'ordinal',
    fillDomain: [new Date(2015, 1), new Date(2015, 3)],
    xDomain: [1, 10],
    yDomain: ['a', 'b', 'c'],
    fillRange: [0, 500],
    xRange: [0, 500],
    yRange: [500, 0],
  }
  const transformedProps = methods.addScales(props)
  assert(transformedProps.xScale)
  assert(transformedProps.yScale)
  assert(transformedProps.fillScale)
})
