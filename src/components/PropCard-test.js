
import test from 'tape'

import React from 'react'
import renderComponent from '../renderComponentTest'

import {PropCard} from './PropCard'

const identity = (d) => d

test('PropCard', t => {
  var component = renderComponent(<PropCard connectDragSource={identity}/>)
  t.equal(component.type, 'div')
  t.end()
})