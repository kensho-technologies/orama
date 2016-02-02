// dist entry point

import 'babel-regenerator-runtime'
import 'es6-promise'
import 'whatwg-fetch'

export * from './'

import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'

global.React = React
global.ReactDOM = ReactDOM
global._ = _
