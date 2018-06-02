// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'

import getMidY from '../../../src/utils/rect/getMidY'

test('getMidY', () => {
  assert(getMidY)
  assert.deepEqual(getMidY({}), 0)
  assert.deepEqual(getMidY({y: 10, height: 100}), 60)
})
