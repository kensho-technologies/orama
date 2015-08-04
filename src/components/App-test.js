/* @flow */

import test from 'tape'

import React from 'react'
import renderComponent from '../renderComponentTest'

import App, * as AppUtils from './App'

test('App should exist and render', (t) => {
  t.ok(App)
  var component = renderComponent(<App/>)
  t.equal(component.type, 'div')
  t.end()
})

test('App.add', (t) => {
  t.ok(AppUtils.add)
  t.equal(AppUtils.add(1, 1), 2, 'App.add result')
  t.end()
})
