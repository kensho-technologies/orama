// devServer entry point

import React from 'react'
import ReactDOM from 'react-dom'

import {Store} from './devApp/Store'

ReactDOM.render(
  <Store/>,
  document.getElementById('root')
)
