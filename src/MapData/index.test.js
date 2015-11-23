
import {it as test} from 'mocha'
import assert from 'assert'

import React from 'react'
import shallowRender from '@luiscarli/shallow-render'

import MapData, * as methods from './'

test('MapData', () => {
  const component = shallowRender(<MapData/>)
  assert.strictEqual(component.type.displayName, 'Block')

  const ItemName = shallowRender(<methods.ItemName/>)
  assert.strictEqual(ItemName.type.displayName, 'Block')

  const Select = shallowRender(<methods.Select/>)
  assert.strictEqual(Select.type, 'select')
})
