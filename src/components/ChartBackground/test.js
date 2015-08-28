
import test from 'tape'

import React from 'react'
import {renderComponent} from '../../assertionHelpers'

import ChartBackground from './'

test('ChartBackground', t => {
  var component = renderComponent(
    <ChartBackground
        size={{width: 0, height: 0}}
        />
  )
  t.equal(component.type, 'canvas')
  t.end()
})
