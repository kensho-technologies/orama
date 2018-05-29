// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'

import {canvasMock, ctxMock, getCachedContext} from '../../src/utils/canvasUtils'

test('canvasMock.canvas', () => {
  assert.equal(canvasMock.getContext('2d'), ctxMock)
})

test('Chart methods.getCachedContext', () => {
  assert.deepEqual(typeof getCachedContext(), 'object')
})
