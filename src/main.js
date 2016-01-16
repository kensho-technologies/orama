// devServer entry point

import React from 'react'
import ReactDOM from 'react-dom'

import {Store} from './devDemo/Store'

ReactDOM.render(
  <Store/>,
  document.getElementById('rootNode')
)
