
import {it as test} from 'mocha'
import assert from 'assert'
import _ from 'lodash'
import {DEFAULT_THEME as theme} from '../../defaultTheme'

import * as methods from './'

test('Chart/addMethods.addTypes', () => {
  const props = {
    fillArray: [
      new Date(2015, 1, 1), new Date(2015, 1, 2), new Date(2015, 1, 3),
    ],
    xArray: [1, 2, 10, 'a', 'b'],
    yArray: ['a', 'b', 'c'],
    groupedKeys: ['fill', 'x', 'y', 'other'],
    otherType: 'ordinal',
    theme,
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
test('Chart/addMethods.addDomains', () => {
  const props = {
    fillArray: [
      new Date(2015, 1), new Date(2015, 2), new Date(2015, 3),
    ],
    xArray: [1, 2, 10, 'a', 'b'],
    yArray: ['a', 'b', 'c'],
    groupedKeys: ['fill', 'x', 'y'],
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
test('Chart/addMethods.addRanges', () => {
  const props = {
    plotRect: {x: 0, y: 0, width: 500, height: 500},
    groupedKeys: ['fill', 'x', 'y'],
    fillType: 'time',
    xType: 'linear',
    yType: 'ordinal',
    theme,
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
test('Chart/addMethods.addTickCounts', () => {
  const props = {
    groupedKeys: ['fill', 'x', 'y'],
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
test('Chart/addMethods.addScales', () => {
  const props = {
    groupedKeys: ['fill', 'x', 'y'],
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
