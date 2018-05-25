// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'

import getPlotValues from '.'

test('Layer/getPlotValues 1', () => {
  const props = {x: 'x'}
  const datum = {x: 10}
  const actual = getPlotValues(props, datum)
  const expected = {
    alpha: undefined,
    data: datum,
    fill: undefined,
    fillAlpha: undefined,
    fontSize: undefined,
    hoverAlpha: undefined,
    lineDash: undefined,
    lineWidth: undefined,
    radius: undefined,
    rotate: undefined,
    stroke: undefined,
    strokeAlpha: undefined,
    text: undefined,
    hoverFill: undefined,
    hoverLineWidth: undefined,
    hoverStroke: undefined,
    textAlign: undefined,
    textBaseline: undefined,
    textSnap: undefined,
    x: 10,
    x0: undefined,
    x1: undefined,
    x2: undefined,
    xOffset: undefined,
    y: undefined,
    y0: undefined,
    y1: undefined,
    y2: undefined,
    yOffset: undefined,
    font: undefined,
  }
  assert.deepEqual(actual, expected)
})

test('Layer/getPlotValues 2', () => {
  const props = {x: 'x'}
  const datum = {x: 10}
  const defaults = {alpha: 0.5}
  const actual = getPlotValues(props, datum, undefined, defaults)
  const expected = {
    alpha: 0.5,
    data: datum,
    fill: undefined,
    fillAlpha: undefined,
    fontSize: undefined,
    hoverAlpha: undefined,
    lineDash: undefined,
    lineWidth: undefined,
    radius: undefined,
    rotate: undefined,
    stroke: undefined,
    hoverFill: undefined,
    hoverLineWidth: undefined,
    hoverStroke: undefined,
    strokeAlpha: undefined,
    text: undefined,
    textAlign: undefined,
    textBaseline: undefined,
    textSnap: undefined,
    x: 10,
    x0: undefined,
    x1: undefined,
    x2: undefined,
    xOffset: undefined,
    y: undefined,
    y0: undefined,
    y1: undefined,
    y2: undefined,
    yOffset: undefined,
    font: undefined,
  }
  assert.deepEqual(actual, expected)
})
