/* @flow */

import test from 'tape'

import React from 'react'
import {renderComponent} from '../../assertionHelpers'

import * as localUtils from './'

test('App should exist and render', t => {
  t.ok(localUtils.App)
  var component = renderComponent(<localUtils.App/>)
  t.equal(component.type, 'div')
  t.end()
})

test('parseString', t => {
  t.equal(localUtils.parseString('0.06%'), 0.06)
  t.equal(localUtils.parseString('0.00%'), 0)
  t.equal(localUtils.parseString(0.06), 0.06)
  t.deepEqual(localUtils.parseString('12/12/1980'), new Date('12/12/1980'))
  t.equal(localUtils.parseString('Technology'), 'Technology')
  t.end()
})
