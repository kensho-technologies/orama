// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'

import {THEME} from '../../src/defaults'
import getRange from '../../src/chartCore/getRange'

test('chartCore/getRange', () => {
  const props = {
    plotRect: {x: 0, y: 0, width: 500, height: 500},
    xType: 'linear',
    yType: 'ordinal',
    fillType: 'time',
    theme: THEME,
  }
  assert.deepEqual(getRange(props, 'x'), [0, 500])
  assert.deepEqual(getRange(props, 'y'), [500, 0])
  assert.deepEqual(getRange(props, 'fill'), THEME.plotLinearRangeFill)
})
