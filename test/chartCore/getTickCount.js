// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'

import getTickCount from '../../src/chartCore/getTickCount'

test('chartCore/getTickCount', () => {
  const props = {
    xRange: [0, 500],
    yRange: [500, 0],
    yTickSpace: 10,
  }
  assert.deepEqual(getTickCount(props, 'x'), 4)
  assert.deepEqual(getTickCount(props, 'y'), 50)
})
