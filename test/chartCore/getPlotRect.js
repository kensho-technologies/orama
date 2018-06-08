// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'

import {THEME} from '../../src/defaults'
import getPlotRect, {getMaxTextWidth} from '../../src/chartCore/getPlotRect'

test('Chart/getPlotRect.getMaxTextWidth', () => {
  const ticks = [{value: 'a', text: 'a'}, {value: 'amadeus', text: 'amadeus'}]
  const actual = getMaxTextWidth(THEME, ticks)
  const expected = 7
  assert.deepEqual(actual, expected)
})

test('chartCore/getPlotRect', () => {
  const props = {
    backgroundOffset: 15,
    width: 500,
    height: 500,
    margin: {},
    theme: THEME,
    yDomain: [0, 100],
    yType: 'linear',
    groupedKeys: ['x', 'y'],
    xShowLabel: true,
    xShowTicks: true,
    yShowLabel: true,
    yShowTicks: true,
  }
  const actual = getPlotRect(props)
  const expected = {
    backgroundOffset: 15,
    height: 500,
    width: 500,
    plotRect: {x: 56.5, y: 15, width: 428.5, height: 424.5},
    margin: {bottom: 60.5, left: 56.5, right: 15, top: 15},
  }
  assert.deepEqual(actual, expected)
})
