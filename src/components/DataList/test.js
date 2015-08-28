
import test from 'tape'

import React from 'react'
import {renderComponent} from '../../assertionHelpers'

import DataList from './'

test('DataList', t => {
  var component = renderComponent(<DataList/>)
  t.equal(component.type, 'div')
  t.end()
})
