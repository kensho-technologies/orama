
import {it as test} from 'mocha'
import assert from 'assert'

import React from 'react'
import renderComponent from '../../renderComponentTest'

import {PropCard} from './'

const identity = (d) => d

test('PropCard', () => {
  var component = renderComponent(<PropCard connectDragSource={identity}/>)
  assert.strictEqual(component.type, 'div')
})
