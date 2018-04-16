// Copyright 2017 Kensho Technologies, LLC.

import {it as test} from 'mocha'
import assert from 'assert'

import {layerMapper} from './'
import {getLocalKeys} from './'

test('Chart/getLocalKeys.layerMapper 1', () => {
  const actual = layerMapper({})
  const expected = {
    localAccessors: {},
    localKeys: [],
  }
  assert.deepEqual(actual, expected)
})
test('Chart/getLocalKeys.layerMapper 2', () => {
  const layer = {
    x: 'x', x1: 'x1', y: 'y',
  }
  const actual = layerMapper(layer)
  const expected = {
    ...layer,
    localAccessors: {x: 'x', x1: 'x1', y: 'y'},
    localKeys: ['x', 'x1', 'y'],
  }
  assert.deepEqual(actual, expected)
})

test('Chart/getLocalKeys.getLocalKeys 1', () => {
  const layer = {
    x: 'x', x1: 'x1', y: 'y',
  }
  const props = {layers: [layer]}
  const result = getLocalKeys(props)
  const actual = result.layers[0]
  const expected = {
    ...layer,
    localAccessors: {x: 'x', x1: 'x1', y: 'y'},
    localKeys: ['x', 'x1', 'y'],
  }
  assert.ok(result.layers)
  assert.deepEqual(actual, expected)
})
