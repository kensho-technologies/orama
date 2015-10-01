
import {it as test} from 'mocha'
import assert from 'assert'

import React from 'react'
import shallowRender from '../../shallowRender'

import {Block, Flex} from './'

test('Block', () => {
  const component = shallowRender(<Block margin={10}/>)
  assert.deepEqual(component.type, 'div')
  assert.deepEqual(component.props.style, {display: 'block', margin: 10, children: undefined})
})

test('Flex', () => {
  const component = shallowRender(<Flex margin={10}/>)
  assert.deepEqual(component.type, 'div')
  assert.deepEqual(component.props.style, {display: 'flex;display:-webkit-flex;display:-ms-flexbox', margin: 10, children: undefined})
})
