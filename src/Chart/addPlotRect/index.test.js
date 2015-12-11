
import {it as test} from 'mocha'
import assert from 'assert'

import * as methods from './'
import {DEFAULT_THEME} from '../../defaultTheme'

test('Chart/addPlotRect.getMaxTextWidth', () => {
  const ticks = [
    {value: 'a', text: 'a'},
    {value: 'amadeus', text: 'amadeus'},
  ]
  assert.deepEqual(
    methods.getMaxTextWidth(DEFAULT_THEME, ticks),
    7
  )
})

test('Chart/addPlotRect.addPlotRect', () => {
  const props = {
    backgroundOffset: 15,
    size: {width: 500, height: 500},
    theme: DEFAULT_THEME,
    x: 'p2',
    y: 'p1',
    yDomain: [0, 100],
    yType: 'linear',
    groupedKeys: ['x', 'y'],
  }
  assert.deepEqual(
    methods.addPlotRect(props),
    {
      ...props,
      plotRect: {x: 55.5, y: 15, width: 429.5, height: 424.5},
      margin: {bottom: 60.5, left: 55.5, right: 15, top: 15},
    }
  )
})
