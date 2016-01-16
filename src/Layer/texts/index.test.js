
import {it as test} from 'mocha'
import assert from 'assert'
import {PLOT_RECT as plotRect} from '../../chartCore/defaults'

import {texts} from './'

test('Chart/texts 1', () => {
  const renderData = texts({
    data: [{x1: 1, x2: 1}],
    xScale: d => d,
    yScale: d => d,
    plotRect,
  })
  assert.deepEqual(renderData[0].type, 'text')
})
test('Chart/texts missing scales', () => {
  const renderData = texts({
    data: [{x1: 1, x2: 1}],
    plotRect,
  })
  assert.deepEqual(renderData, undefined)
})
test('Chart/texts grouped data', () => {
  const renderData = texts({
    data: [[{x1: 1, x2: 1}]],
    xScale: d => d,
    yScale: d => d,
    plotRect,
  })
  assert.deepEqual(renderData[0].type, 'text')
})
