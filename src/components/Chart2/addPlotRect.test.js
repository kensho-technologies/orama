
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
    size: {width: 500, height: 500},
    yDomain: [0, 100],
    yType: 'linear',
  }
  assert.deepEqual(
    methods.addPlotRect(props),
    {
      ...props,
      plotRect: {x: 53.25, y: 20, width: 426.75, height: 410.25},
    }
  )
})
