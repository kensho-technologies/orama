
import {it as test} from 'mocha'
import assert from 'assert'

import React from 'react'
import shallowRender from '@luiscarli/shallow-render'

import {chartWidthHOC} from './'

const InputComponent = () => <div/>

test('Chart/chartWidthHOC', () => {
  const TestComp = chartWidthHOC(InputComponent)
  const component = shallowRender(
    <TestComp/>
  )
  assert.deepEqual(component.type, 'div')
})
