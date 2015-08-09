/* @flow */

import React from 'react'
import App from './components/App'
import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'
import charts from './stores/charts'

var mainReducer = combineReducers({
  charts,
})
var store = createStore(mainReducer)

React.render(
  <Provider store={store}>
    {() => <App />}
  </Provider>,
  document.getElementById('root'),
)
