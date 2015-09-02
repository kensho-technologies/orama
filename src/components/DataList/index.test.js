
import {it as test} from 'mocha'
import assert from 'assert'

import React from 'react'
import shallowRender from '../../shallowRender'

import DataList from './'

test('DataList', () => {
  const component = shallowRender(<DataList/>)
  assert.strictEqual(component.type, 'div')
})
