
import {it as test} from 'mocha'
import assert from 'assert'

import React from 'react'
import renderComponent from '../../renderComponentTest'

import LeftLabel from './'

test('LeftLabel', () => {
  var component = renderComponent(<LeftLabel/>)
  assert.strictEqual(component.type, 'div')
})
