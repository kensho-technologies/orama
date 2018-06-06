// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'
import * as React from 'react'

import shallowRender from '../helpers/shallowRender'
import {PLOT_RECT, THEME as theme} from '../../src/defaults'
import ChartBackground, {
  getBackground,
  getXGuides,
  getYGuides,
  getXText,
  getYText,
  getBackgroundRenderData,
} from '../../src/ChartBackground'

test('ChartBackground', () => {
  assert(shallowRender(<ChartBackground />))
})

test('ChartBackground.getBackground', () => {
  const props = {theme}
  const background = getBackground(props)
  assert.deepEqual(background.type, 'area')
  assert.deepEqual(background.fill, theme.plotBackgroundFill)
})

test('ChartBackground.getXGuides', () => {
  const props = {
    theme,
    groupedKeys: ['x'],
    xTicks: [{value: 10}],
    xScale: d => d,
    plotRect: PLOT_RECT,
  }
  const xGuides = getXGuides(props)
  assert.deepEqual(xGuides[0].type, 'line')
})

test('ChartBackground.getYGuides', () => {
  const props = {
    theme,
    groupedKeys: ['y'],
    yTicks: [{value: 10}],
    yScale: d => d,
    plotRect: PLOT_RECT,
  }
  const yGuides = getYGuides(props)
  assert.deepEqual(yGuides[0].type, 'line')
})

test('ChartBackground.getXText', () => {
  const props = {
    theme,
    groupedKeys: ['x'],
    xTicks: [{value: 10}],
    xScale: d => d,
    plotRect: PLOT_RECT,
  }
  const xGuides = getXText(props)
  assert.deepEqual(xGuides[0].type, 'text')
})

test('ChartBackground.getYText', () => {
  const props = {
    theme,
    groupedKeys: ['y'],
    yTicks: [{value: 10}],
    yScale: d => d,
    plotRect: PLOT_RECT,
  }
  const yGuides = getYText(props)
  assert.deepEqual(yGuides[0].type, 'text')
})

test('ChartBackground.getBackgroundRenderData', () => {
  const props = {
    theme,
  }
  const backgroundRenderData = getBackgroundRenderData(props)
  assert.deepEqual(backgroundRenderData[0].type, 'area')
})
