
import test from 'tape'

import React from 'react'
import {renderComponent} from '../../assertionHelpers'

import {DropCard} from './'

const identity = (d) => d

test('DropCard', t => {
  var component = renderComponent(<DropCard connectDropTarget={identity}/>)
  t.equal(component.type, 'div')
  t.end()
})
