// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'

import {THEME as theme} from '../../src/defaults'
import text from '../../src/plot/text'

const plotRect = {x: 10, y: 10, width: 480, height: 480}

test('Chart/text 1', () => {
  const renderData = text({
    data: [{x1: 1, x2: 1}],
    xScale: d => d,
    yScale: d => d,
    textValue: 'a',
    plotRect,
    theme,
  })
  assert.deepEqual(renderData[0].type, 'text')
})

test('Chart/text missing scales', () => {
  const renderData = text({
    data: [{x1: 1, x2: 1}],
    plotRect,
    textValue: 'a',
    theme,
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
    theme,
  })
  assert.deepEqual(renderData[0].type, 'text')
})
