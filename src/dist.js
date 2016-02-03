// dist entry point

import 'babel-regenerator-runtime'
import 'es6-promise'
import 'whatwg-fetch'

import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash/fp'

export * from './'
import * as orama from './'
import {State} from './devApp/State'
import * as fetchers from './devApp/fetchers'

global.orama = orama
global.State = State
_.each((value, key) => global[key] = value, orama)
_.each((value, key) => global[key] = value, fetchers)

global.React = React
global.ReactDOM = ReactDOM
global._ = _
