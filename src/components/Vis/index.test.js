
import {it as test} from 'mocha'
import assert from 'assert'

import React from 'react'
import renderComponent from '../../renderComponentTest'

import Vis from './'

test('Vis', () => {
  var component = renderComponent(<Vis/>)
  assert.strictEqual(component.type, 'div')
})
