
import {it as test} from 'mocha'
import assert from 'assert'

import React from 'react'
import shallowRender from '@luiscarli/shallow-render'

import RenderAnnotation from './'

test('RenderAnnotation', () => {
  const component = shallowRender(<RenderAnnotation size={{width: 500, height: 500}}/>)
  assert.deepEqual(component.type.displayName, 'Block')
})
