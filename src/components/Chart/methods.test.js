
import test from 'tape'

import * as methods from './methods'

test('Chart methods.calculateMargin', t => {
  const opts = {
    size: {width: 500, height: 500},
    xType: 'linear',
    yType: 'linear',
    xDomain: [0, 100],
    yDomain: [0, 100],
  }
  t.deepEqual(
    typeof methods.calculateMargin(opts),
    'object'
  )
  t.end()
})

test('Chart methods.getTicks', t => {
  t.deepEqual(
    methods.getTicks('linear', [0, 100], 3),
    [0, 50, 100],
  )
  t.deepEqual(
    methods.getTicks('ordinal', [0, 100]),
    [0, 100],
  )
  t.end()
})

test('Chart methods.getMaxTextWidth', t => {
  t.deepEqual(
    methods.getMaxTextWidth('sans', 16, ['label1', 'superLabel']),
    10,
  )
  t.end()
})

test('Chart methods.getRenderContext', t => {
  t.deepEqual(
    typeof methods.getRenderContext(),
    'object'
  )
  t.end()
})
