// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'

import {getForProps} from '../../src/chartCore/getForProps'

test('Chart/getForProps 1', () => {
  const getFunc = () => 'test'
  const getTest = getForProps('Test', getFunc)
  const props = {
    groupedKeys: ['x', 'y'],
  }
  const actual = getTest(props)
  const expected = {
    xTest: 'test',
    yTest: 'test',
  }
  assert.deepEqual(actual, expected)
})
test('Chart/getForProps 2', () => {
  const getFunc = () => 'test'
  const getTest = getForProps('Test', getFunc)
  const props = {
    groupedKeys: ['x', 'y'],
    xTest: 'overrided',
  }
  const actual = getTest(props)
  const expected = {
    yTest: 'test',
  }
  assert.deepEqual(actual, expected)
})
