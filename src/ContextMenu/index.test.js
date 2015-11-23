
import {it as test} from 'mocha'
import assert from 'assert'

import React from 'react'
import shallowRender from '@luiscarli/shallow-render'

import ContextMenu from './'

test('ContextMenu', () => {
  const component = shallowRender(
    <ContextMenu
      onUpdate={() => undefined}
    />
  )
  assert.deepEqual(component.type.displayName, 'Block')
})
