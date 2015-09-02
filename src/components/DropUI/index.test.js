
import {it as test} from 'mocha'
import assert from 'assert'

import React from 'react'
import renderComponent from '../../renderComponentTest'

import DropUI from './'

test('DropUI', () => {
  var component = renderComponent(<DropUI/>)
  assert.strictEqual(component.type, 'div')
})
