// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'

import {PLOT_RECT as plotRect} from '../../src/chartCore/defaults'
import {DEFAULT_THEME as defaultTheme} from '../../src/defaultTheme'
import text from '../../src/Layer/text'

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
