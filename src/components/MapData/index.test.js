
import {it as test} from 'mocha'
import assert from 'assert'

import React from 'react'
import shallowRender from '../../shallowRender'

import MapData from './'

test('MapData', () => {
  const component = shallowRender(<MapData/>)
  assert.strictEqual(component.type.displayName, 'Block')
})
