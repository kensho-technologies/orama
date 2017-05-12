// Copyright 2017 Kensho Technologies, Inc.

import {it as test} from 'mocha'
import assert from 'assert'

import {getName} from './'

test('getName', () => {
  assert.equal(
    getName('Chart'),
    'Chart'
  )
  assert.equal(
    getName('_Chart'),
    'Chart'
  )
})
