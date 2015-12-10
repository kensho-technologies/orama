
import {it as test} from 'mocha'
import assert from 'assert'

import React from 'react'
import shallowRender from '@luiscarli/shallow-render'

import {Tooltip} from './'

test('Tooltip', () => {
  var component = shallowRender(
    <Tooltip
      hoverData={{}}
      layerProps={{}}
    />
  )
  assert.deepEqual(
    component.type.displayName,
    undefined
  )
})
