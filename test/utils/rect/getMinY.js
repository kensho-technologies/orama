// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'

import getMinY from '../../../src/utils/rect/getMinY'

test('getMinY', () => {
  assert(getMinY)
  assert.deepEqual(getMinY({y: 10, height: 100}), 10)
})
