
import {it as test} from 'mocha'
import assert from 'assert'

import {wrapUpNewProps} from './'
import {getDimArrays} from './'

test('Chart/getDimArrays.wrapUpNewProps 1', () => {
  const dimArrays = {
    x: [1, 2],
    y: ['a', 'b'],
  }
  const actual = wrapUpNewProps(dimArrays)
  const expected = {
    xArray: [1, 2],
    yArray: ['a', 'b'],
    groupedKeys: ['x', 'y'],
  }
  assert.deepEqual(actual, expected)
})

test('Chart/getDimArrays.getDimArrays 1', () => {
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
  const actual = getDimArrays(props)
  const expected = {
    xArray: [1, 2, 3, 4],
    groupedKeys: ['x'],
  }
  assert.deepEqual(actual, expected)
})
