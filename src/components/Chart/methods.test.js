
import {it as test} from 'mocha'
import assert from 'assert'

import * as methods from './methods'

test('Chart methods.calculateMargin', () => {
  const opts = {
    size: {width: 500, height: 500},
    xType: 'linear',
    yType: 'linear',
    xDomain: [0, 100],
    yDomain: [100, 0],
  }
  assert.deepEqual(
    methods.calculateMargin(opts),
    {x: 56.95, y: 20, width: 423.05, height: 415.75}
  )
})

test('Chart methods.getMaxTextWidth', () => {
  assert.deepEqual(
    methods.getMaxTextWidth('sans', 16, ['label1', 'superLabel']),
    10
  )
  assert.deepEqual(
    methods.getMaxTextWidth('sans', 16, [0, 50, 100]),
    3
  )
})

test('Chart methods.getRenderContext', () => {
  assert.deepEqual(
    typeof methods.getRenderContext(),
    'object'
  )
})
