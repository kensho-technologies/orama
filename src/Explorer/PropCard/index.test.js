
import {it as test} from 'mocha'
import assert from 'assert'

import React from 'react'
import shallowRender from '@luiscarli/shallow-render'

import {PropCard} from './'

const identity = (d) => d

test('PropCard', () => {
  const component = shallowRender(<PropCard connectDragSource={identity}/>)
  assert.strictEqual(component.type, 'div')
})
