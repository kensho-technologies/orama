
/* eslint react/prop-types:0 */

export const title = 'Read Size'
export const tags = []
export const hide = true
export const date = new Date('Mon Feb 22 2016 19:42:20 GMT-0500 (EST)')
export const description = ''
export code from '!!raw!./'

import React from 'react'
import {Chart, Lines} from '../../../'
import {State} from 'on-update'

export const Component = props =>
  <Chart>
    <Lines
      data={props.fbData}
      x='Date'
      y='Adj. Close'
    />
  </Chart>

const startWith = props => {
  props.setState({})
}

export const DataVis = props =>
  <State startWith={startWith}>
    <Component {...props}/>
  </State>
