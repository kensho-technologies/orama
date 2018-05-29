// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'

import * as methods from '../../src/utils/canvasUtils'

test('canvasMock.canvas', () => {
  assert.equal(methods.canvasMock.getContext('2d'), methods.ctxMock)
})
test('Chart methods.getCachedContext', () => {
  assert.deepEqual(typeof methods.getCachedContext(), 'object')
})
