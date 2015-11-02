

import {it as test} from 'mocha'
import assert from 'assert'

import React from 'react'
import shallowRender from '@luiscarli/shallow-render'

import ContextMenuItem from './'

test('ContextMenuItem', () => {
  const component = shallowRender(
    <ContextMenuItem
      onUpdate={() => undefined}
    />
  )
  assert.deepEqual(component.type.displayName, 'Block')
})
