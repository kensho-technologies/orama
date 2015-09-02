
import {it as test} from 'mocha'
import assert from 'assert'

import React from 'react'
import renderComponent from '../../renderComponentTest'

import DataList from './'

test('DataList', () => {
  var component = renderComponent(<DataList/>)
  assert.strictEqual(component.type, 'div')
})
