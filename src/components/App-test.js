/* @flow */

import test from 'tape'

import React from 'react'
import renderComponent from '../renderComponentTest'

import App from './App'

test('App should exist and render', (t) => {
  t.ok(App)
  var component = renderComponent(<App/>)
  t.equal(component.type, 'div')
  t.end()
})
