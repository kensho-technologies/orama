
import {it as test} from 'mocha'
import assert from 'assert'

import * as methods from './addPlotRect'
import DEFAULT_THEME from '../defaultTheme'

test('Chart2.getMaxTextWidth', () => {
  assert.deepEqual(
    methods.getMaxTextWidth(DEFAULT_THEME, ['a', 'amadeus']),
    7
  )
})

test('Chart2.addPlotRect', () => {
  const props = {
    backgroundOffset: 15,
    size: {width: 500, height: 500},
    theme: DEFAULT_THEME,
    x: 'p2',
    y: 'p1',
    yDomain: [0, 100],
    yType: 'linear',
    dimensions: ['x', 'y'],
  }
  assert.deepEqual(
    methods.addPlotRect(props),
    {
      ...props,
      plotRect: {x: 49, y: 15, width: 436, height: 431},
      margin: {bottom: 54, left: 49, right: 15, top: 15},
    }
  )
})
