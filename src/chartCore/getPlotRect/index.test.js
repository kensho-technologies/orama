// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'

import {BACKGROUND_OFFSET as backgroundOffset} from '../defaults'
import {DEFAULT_THEME} from '../../defaultTheme'

import {getMaxTextWidth} from '.'
import {getPlotRect} from '.'

test('Chart/getPlotRect.getMaxTextWidth', () => {
  const ticks = [{value: 'a', text: 'a'}, {value: 'amadeus', text: 'amadeus'}]
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
    plotRect: {x: 56.5, y: 15, width: 428.5, height: 424.5},
    margin: {bottom: 60.5, left: 56.5, right: 15, top: 15},
  }
  assert.deepEqual(actual, expected)
})
