// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'

import getMaxX from '../../../src/utils/rect/getMaxX'

test('getMaxX', () => {
  assert(getMaxX)
  assert.deepEqual(getMaxX({}), 0)
  assert.deepEqual(getMaxX({x: 10, width: 100}), 110)
})
