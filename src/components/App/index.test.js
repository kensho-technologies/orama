
import {it as test} from 'mocha'
import assert from 'assert'

import React from 'react'
import renderComponent from '../../renderComponentTest'

import * as localUtils from './'

test('App should exist and render', () => {
  assert(localUtils.App)
  var component = renderComponent(<localUtils.App/>)
  assert.strictEqual(component.type, 'div')
})

test('parseString', () => {
  assert.strictEqual(localUtils.parseString('0.06%'), 0.06)
  assert.strictEqual(localUtils.parseString('0.00%'), 0)
  assert.strictEqual(localUtils.parseString(0.06), 0.06)
  assert.deepEqual(localUtils.parseString('12/12/1980'), new Date('12/12/1980'))
  assert.strictEqual(localUtils.parseString('Technology'), 'Technology')
})
