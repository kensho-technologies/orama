
export const title = 'Annotation Extension'
export const tags = []
export const hide = true
export const date = new Date('Tue Mar 08 2016 14:07:49 GMT-0500 (EST)')
export const description = ''
export code from '!!raw!./'

import React from 'react'
import {Chart, Lines, Annotation} from '../../../'
import {State} from 'on-update'

export const Component = props =>
  <Annotation>
    <Chart>
      <Lines
        data={props.fbData}
        x='Date'
        y='Adj. Close'
      />
    </Chart>
  </Annotation>

const startWith = props => {
  props.setState({})
}

export const DataVis = props =>
  <State startWith={startWith}>
    <Component {...props}/>
  </State>
