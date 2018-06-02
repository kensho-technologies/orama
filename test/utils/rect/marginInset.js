// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'

import marginInset from '../../../src/utils/rect/marginInset'

test('marginInset', () => {
  assert(marginInset)
  assert.deepEqual(marginInset({}, {}), {x: 0, y: 0, width: 0, height: 0})
  const rect = marginInset({}, {width: 100, height: 100})
  assert.deepEqual(rect, {x: 0, y: 0, width: 100, height: 100})
  const rect2 = marginInset({left: 10, top: 10}, {width: 100, height: 100})
  assert.deepEqual(rect2, {x: 10, y: 10, width: 90, height: 90})
})
