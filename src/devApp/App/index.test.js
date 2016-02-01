
import {it as test} from 'mocha'
import assert from 'assert'

import React from 'react'
import shallowRender from '@luiscarli/shallow-render'

import {App} from './'

test('App', () => {
  const component = shallowRender(<App/>)
  assert.deepEqual(component.type.displayName, 'Main')
})
