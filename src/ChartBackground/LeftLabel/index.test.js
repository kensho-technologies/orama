
import {it as test} from 'mocha'
import assert from 'assert'

import React from 'react'
import shallowRender from '@luiscarli/shallow-render'

import {LeftLabel} from './'

test('LeftLabel', () => {
  const component = shallowRender(<LeftLabel/>)
  assert.strictEqual(component.type.displayName, 'Block')
})
