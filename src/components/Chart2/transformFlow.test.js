

import {it as test} from 'mocha'
import assert from 'assert'
import _ from 'lodash'
import defaultTheme from '../defaultTheme'

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
    size: {width: 500, height: 500},
    theme: defaultTheme,
    x: 'p1',
    y: 'p2',
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
    _.omit(transformedProps, ['data', 'size', 'xArray', 'yArray', 'theme']),
    {
      'dimensions': ['x', 'y'],
      'plotRect': {
        'height': 418,
        'width': 424,
        'x': 61,
        'y': 15,
      },
      margin: {
        bottom: 67,
        left: 61,
        right: 15,
        top: 15,
      },
      'x': 'p1',
      'xDomain': ['10', '15', '25'],
      'xRange': [61, 485],
      'xTickCount': 4,
      'xType': 'ordinal',
      'y': 'p2',
      'yDomain': ['0', '-1', '-2'],
      'yRange': [433, 15],
      'yTickCount': 5,
      'yType': 'ordinal',
    },
  )
})
