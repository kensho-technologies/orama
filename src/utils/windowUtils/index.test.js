// Copyright 2018 Kensho Technologies, LLC.

import {it as test} from 'mocha'
import assert from 'assert'

import {getWindow, windowMock} from './'

test('utils/windowUtils.getWindow', () => {
  assert.deepEqual(
    getWindow(),
    windowMock
  )
})
