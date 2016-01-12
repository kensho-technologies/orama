
import React from 'react'
import ReactDOM from 'react-dom'

export {Chart} from './Chart'
export * from './plots'
export * from './Layer'
export {getTimeSeries} from './utils/dataGeneration'

global.React = React
global.ReactDOM = ReactDOM
