// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'

import inset from '../../../src/utils/rect/inset'

test('inset', () => {
  assert(inset)
  assert.deepEqual(inset(10, {width: 100, height: 100}), {
    x: 10,
    y: 10,
    width: 80,
    height: 80,
  })
})
