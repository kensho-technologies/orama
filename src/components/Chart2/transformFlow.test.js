

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
        'height': 454.5,
        'width': 465,
        'x': 33,
        'y': 6.5,
      },
      margin: {
        bottom: 39,
        left: 33,
        right: 2,
        top: 6.5,
      },
      'x': 'p1',
      'xDomain': ['10', '15', '25'],
      'xRange': [33, 498],
      'xTickCount': 5,
      'xType': 'ordinal',
      'y': 'p2',
      'yDomain': ['0', '-1', '-2'],
      'yRange': [461, 6.5],
      'yTickCount': 5,
      'yType': 'ordinal',
    },
  )
})
