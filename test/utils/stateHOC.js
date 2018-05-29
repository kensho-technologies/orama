// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'

import {getName} from '../../src/utils/stateHOC'

test('getName', () => {
  assert.equal(getName('Chart'), 'Chart')
  assert.equal(getName('_Chart'), 'Chart')
})
