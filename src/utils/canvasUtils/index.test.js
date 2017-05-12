// Copyright 2017 Kensho Technologies, Inc.

import {it as test} from 'mocha'
import assert from 'assert'

import * as methods from './'

test('canvasMock.canvas', () => {
  assert.equal(
    methods.canvasMock.getContext('2d'),
    methods.ctxMock
  )
})
test('Chart methods.getCachedContext', () => {
  assert.deepEqual(
    typeof methods.getCachedContext(),
    'object'
  )
})
