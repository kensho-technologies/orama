
import {it as test} from 'mocha'
import assert from 'assert'

import React from 'react'
import renderComponent from '../../renderComponentTest'

import {DropCard} from './'

const identity = (d) => d

test('DropCard', () => {
  var component = renderComponent(<DropCard connectDropTarget={identity}/>)
  assert.strictEqual(component.type, 'div')
})
