// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'

import getMinX from '../../../src/utils/rect/getMinX'

test('getMinX', () => {
  assert(getMinX)
  assert.deepEqual(getMinX({x: 10, width: 100}), 10)
})
