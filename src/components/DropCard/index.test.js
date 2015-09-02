
import {it as test} from 'mocha'
import assert from 'assert'

import React from 'react'
import shallowRender from '../../shallowRender'

import {DropCard} from './'

const identity = (d) => d

test('DropCard', () => {
  const component = shallowRender(<DropCard connectDropTarget={identity}/>)
  assert.strictEqual(component.type, 'div')
})
