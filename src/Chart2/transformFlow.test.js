

import {it as test} from 'mocha'
import assert from 'assert'
import _ from 'lodash'
import {DEFAULT_THEME} from '../defaultTheme'

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
    theme: DEFAULT_THEME,
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
        'height': 424.5,
        'width': 430.5,
        'x': 54.5,
        'y': 15,
      },
      margin: {
        bottom: 60.5,
        left: 54.5,
        right: 15,
        top: 15,
      },
      'backgroundOffset': 15,
      'x': 'p1',
      'xDomain': ['10', '15', '25'],
      'xRange': [54.5, 485],
      'xTickCount': 5,
      'xType': 'ordinal',
      'y': 'p2',
      'yDomain': ['0', '-1', '-2'],
      'yRange': [439.5, 15],
      'yTickCount': 5,
      'yType': 'ordinal',
    },
  )
})
