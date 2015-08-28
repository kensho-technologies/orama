
import test from 'tape'

import React from 'react'
import {renderComponent} from '../../assertionHelpers'

import LeftLabel from './'

test('LeftLabel', t => {
  var component = renderComponent(<LeftLabel/>)
  t.equal(component.type, 'div')
  t.end()
})
