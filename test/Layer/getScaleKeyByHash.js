// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'

import getScaleKeyByHash from '../../src/Layer/getScaleKeyByHash'

test('Layer/getScaleKeyByHash', () => {
  const actual = getScaleKeyByHash({}, 'x0')
  const expected = 'x'
  assert.deepEqual(actual, expected)
})
