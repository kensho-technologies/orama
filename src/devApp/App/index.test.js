
import {it as test} from 'mocha'
import assert from 'assert'

import React from 'react'
import shallowRender from '@luiscarli/shallow-render'

import * as localMethods from './'

test('App should exist and render', () => {
  assert(localMethods.App)
  const component = shallowRender(<localMethods.App/>)
  assert.strictEqual(component.type.displayName, 'Main')
})
