

import {it as test} from 'mocha'
import assert from 'assert'
import _ from 'lodash'
import {DEFAULT_THEME} from '../defaultTheme'
import {WIDTH, HEIGHT} from '../Chart/defaults'

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

test('Chart.transformProps', () => {
  const props = {
    data,
    width: WIDTH,
    height: HEIGHT,
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
    _.omit(transformedProps, ['data', 'width', 'height', 'xArray', 'yArray', 'theme']),
    {
      groupedKeys: ['x', 'y'],
      localKeys: ['x', 'y'],
      plotRect: {
        height: 426.25,
        width: 431.25,
        x: 53.75,
        y: 15,
      },
      margin: {
        bottom: 58.75,
        left: 53.75,
        right: 15,
        top: 15,
      },
      backgroundOffset: 15,
      x: 'p1',
      xDomain: ['10', '15', '25'],
      xRange: [53.75, 485],
      xTickCount: 5,
      xType: 'ordinal',
      y: 'p2',
      yDomain: ['0', '-1', '-2'],
      yRange: [441.25, 15],
      yTickCount: 5,
      yType: 'ordinal',
    },
  )
})
