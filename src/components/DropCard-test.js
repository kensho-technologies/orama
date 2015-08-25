
import test from 'tape'

import React from 'react'
import renderComponent from '../renderComponentTest'

import {DropCard} from './DropCard'

const identity = (d) => d

test('DropCard', t => {
  var component = renderComponent(<DropCard connectDropTarget={identity}/>)
  t.equal(component.type, 'div')
  t.end()
})
