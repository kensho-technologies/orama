// Copyright 2017 Kensho Technologies, LLC.

import {it as test} from 'mocha'
import assert from 'assert'
import {PLOT_RECT as plotRect} from '../../chartCore/defaults'
import {DEFAULT_THEME as defaultTheme} from '../../defaultTheme'

import {text} from './'

test('Chart/text 1', () => {
  const renderData = text({
    data: [{x1: 1, x2: 1}],
    xScale: d => d,
    yScale: d => d,
    textValue: 'a',
    plotRect,
    theme: defaultTheme,
  })
  assert.deepEqual(renderData[0].type, 'text')
})
test('Chart/text missing scales', () => {
  const renderData = text({
    data: [{x1: 1, x2: 1}],
    plotRect,
    textValue: 'a',
    theme: defaultTheme,
  })
  assert.deepEqual(renderData, undefined)
})
test('Chart/text grouped data', () => {
  const renderData = text({
    data: [[{x1: 1, x2: 1}]],
    xScale: d => d,
    yScale: d => d,
    textValue: 'a',
    plotRect,
    theme: defaultTheme,
  })
  assert.deepEqual(renderData[0].type, 'text')
})
