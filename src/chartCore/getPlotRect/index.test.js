
import {it as test} from 'mocha'
import assert from 'assert'
import {BACKGROUND_OFFSET as backgroundOffset} from '../../chartCore/defaults'
import {DEFAULT_THEME} from '../../defaultTheme'

import {getMaxTextWidth} from './'
import {getPlotRect} from './'

test('Chart/getPlotRect.getMaxTextWidth', () => {
  const ticks = [
    {value: 'a', text: 'a'},
    {value: 'amadeus', text: 'amadeus'},
  ]
  const actual = getMaxTextWidth(DEFAULT_THEME, ticks)
  const expected = 7
  assert.deepEqual(actual, expected)
})

test('chartCore/getPlotRect', () => {
  const props = {
    backgroundOffset,
    width: 500,
    height: 500,
    theme: DEFAULT_THEME,
    yDomain: [0, 100],
    yType: 'linear',
    groupedKeys: ['x', 'y'],
  }
  const actual = getPlotRect(props)
  const expected = {
    backgroundOffset,
    height: 500,
    width: 500,
    plotRect: {x: 54.75, y: 15, width: 430.25, height: 426.25},
    margin: {bottom: 58.75, left: 54.75, right: 15, top: 15},
  }
  assert.deepEqual(actual, expected)
})
