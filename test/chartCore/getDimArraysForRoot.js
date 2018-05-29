// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'

import getDimArraysForRoot, {
  extractDimArray,
  getDimArraysForLayer,
} from '../../src/chartCore/getDimArraysForRoot'

test('Chart/getDimArraysForRoot.extractDimArray 1', () => {
  const data = [{x: 1}, {x: 2}]
  const actual = extractDimArray(data, 'x')
  const expected = [1, 2]
  assert.deepEqual(actual, expected)
})
test('Chart/getDimArraysForRoot.extractDimArray 2', () => {
  const data = [{x: null}, {x: NaN}, {x: undefined}, {x: 0}]
  const actual = extractDimArray(data, 'x')
  const expected = [0]
  assert.deepEqual(actual, expected)
})

test('Chart/getDimArraysForRoot.getDimArraysForLayer 2', () => {
  const data = [{x: 1, y: 'a'}, {x: 2, y: 'b'}]
  const layer = {
    data,
    localAccessors: {x: 'x', y: 'y'},
  }
  const actual = getDimArraysForLayer(layer)
  const expected = {
    x: [1, 2],
    y: ['a', 'b'],
  }
  assert.deepEqual(actual, expected)
})

test('Chart/getDimArraysForRoot.getDimArraysForRoot 1', () => {
  const layer = {
    data: [{x: 1, y: 'a'}, {x: 2, y: 'b'}],
    localAccessors: {x: 'x', y: 'y'},
  }
  const props = {
    layers: [layer],
  }
  const actual = getDimArraysForRoot(props)
  const expected = {
    x: [1, 2],
    y: ['a', 'b'],
  }
  assert.deepEqual(actual, expected)
})
test('Chart/getDimArraysForRoot.getDimArraysForRoot 2', () => {
  const layer1 = {
    data: [{x: 1}, {x: 2}],
    localAccessors: {x: 'x', y: 'y'},
  }
  const layer2 = {
    data: [{y: 'a'}, {y: 'b'}],
    localAccessors: {x: 'x', y: 'y'},
  }
  const props = {
    layers: [layer1, layer2],
  }
  const actual = getDimArraysForRoot(props)
  const expected = {
    x: [1, 2],
    y: ['a', 'b'],
  }
  assert.deepEqual(actual, expected)
})
test('Chart/getDimArraysForRoot.getDimArraysForRoot 3', () => {
  const layer1 = {
    data: [{x: 1}, {x: 2}],
    localAccessors: {x: 'x'},
  }
  const layer2 = {
    data: [{x: 3}, {x: 4}],
    localAccessors: {x: 'x'},
  }
  const props = {
    layers: [layer1, layer2],
  }
  const actual = getDimArraysForRoot(props)
  const expected = {
    x: [1, 2, 3, 4],
  }
  assert.deepEqual(actual, expected)
})
