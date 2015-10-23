
import {it as test} from 'mocha'
import assert from 'assert'

import React from 'react'
import shallowRender from '@luiscarli/shallow-render'

import * as localMethods from './'

test('App should exist and render', () => {
  assert(localMethods.App)
  const component = shallowRender(<localMethods.App/>)
  assert.strictEqual(component.type, 'div')
})

test('parseString', () => {
  assert.strictEqual(localMethods.parseString('0.06%'), 0.06)
  assert.strictEqual(localMethods.parseString('0.00%'), 0)
  assert.strictEqual(localMethods.parseString(0.06), 0.06)
  assert.deepEqual(localMethods.parseString('12/12/1980'), new Date('12/12/1980'))
  assert.strictEqual(localMethods.parseString('Technology'), 'Technology')
})
