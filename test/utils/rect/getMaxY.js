// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'

import getMaxY from '../../../src/utils/rect/getMaxY'

test('getMaxY', () => {
  assert(getMaxY)
  assert.deepEqual(getMaxY({}), 0)
  assert.deepEqual(getMaxY({y: 10, height: 100}), 110)
})
