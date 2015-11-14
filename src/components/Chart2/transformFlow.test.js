

import {it as test} from 'mocha'
import assert from 'assert'
import _ from 'lodash'

import {
  addDimArrays,
  addTypes,
  addDomains,
  addPlotRect,
  addRanges,
  addTickCounts,
} from './addMethods'

const data = [
  {p1: '10', p2: '0'}, {p1: '15', p2: '-1'}, {p1: '25', p2: '-2'},
]

test('Chart2.transformProps', () => {
  const props = {
    data,
    x: 'p1',
    y: 'p2',
    size: {width: 500, height: 500},
  }
  const transformedProps = _.flow(
    addDimArrays,
    addTypes,
    addDomains,
    addPlotRect,
    addRanges,
    addTickCounts,
  )(props)
  assert.deepEqual(
    _.omit(transformedProps, ['data', 'size', 'xArray', 'yArray']),
    {
      'dimensions': ['x', 'y'],
      'plotRect': {
        'height': 410.25,
        'width': 427.75,
        'x': 52.25,
        'y': 20,
      },
      'x': 'p1',
      'xDomain': ['10', '15', '25'],
      'xRange': [52.25, 480],
      'xTickCount': 4,
      'xType': 'ordinal',
      'y': 'p2',
      'yDomain': ['0', '-1', '-2'],
      'yRange': [430.25, 20],
      'yTickCount': 5,
      'yType': 'ordinal',
    },
  )
})
