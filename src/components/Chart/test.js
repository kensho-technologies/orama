
import test from 'tape'

import React from 'react'
import {renderComponent} from '../../assertionHelpers'

import Chart from './'

test('Chart', t => {
  const component = renderComponent(<Chart/>)
  t.equal(component.type, 'div')
  t.end()
})
