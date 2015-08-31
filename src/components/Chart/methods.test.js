
import test from 'tape'

import * as methods from './methods'

test('Chart methods.calculateMargin', t => {
  const opts = {
    size: {width: 500, height: 500},
    xType: 'linear',
    yType: 'linear',
    xDomain: [0, 100],
    yDomain: [100, 0],
  }
  t.same(
    methods.calculateMargin(opts),
    {height: 420, width: 417, x: 63, y: 20}
  )
  t.end()
})

test('Chart methods.getTicks', t => {
  t.same(
    methods.getTicks('linear', [0, 100], 3),
    [0, 50, 100]
  )
  t.same(
    methods.getTicks('ordinal', [0, 100]),
    [0, 100]
  )
  t.end()
})

test('Chart methods.getMaxTextWidth', t => {
  t.same(
    methods.getMaxTextWidth('sans', 16, ['label1', 'superLabel']),
    10
  )
  t.same(
    methods.getMaxTextWidth('sans', 16, [0, 50, 100]),
    3
  )
  t.end()
})

test('Chart methods.getRenderContext', t => {
  t.same(
    typeof methods.getRenderContext(),
    'object'
  )
  t.end()
})
