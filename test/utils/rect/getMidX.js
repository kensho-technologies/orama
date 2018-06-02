// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'

import getMidX from '../../../src/utils/rect/getMidX'

test('getMidX', () => {
  assert(getMidX)
  assert.deepEqual(getMidX({}), 0)
  assert.deepEqual(getMidX({x: 10, width: 100}), 60)
})
