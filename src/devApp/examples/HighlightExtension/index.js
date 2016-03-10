
export const title = 'Highlight Extension'
export const tags = []
export const hide = true
export const date = new Date('Thu Mar 10 2016 13:37:11 GMT-0500 (EST)')
export const description = ''
export code from '!!raw!./'

import React from 'react'
import {Chart, Points, Highlight} from '../../../'
import {State} from 'on-update'

export const Component = props =>
  <Highlight>
    <Chart
      xType='log'
    >
      <Points
        data={props.fbData}
        x='Volume'
        y='Adj. Close'
        alphaValue={0.6}
      />
    </Chart>
  </Highlight>

const startWith = props => {
  props.setState({})
}

export const DataVis = props =>
  <State startWith={startWith}>
    <Component {...props}/>
  </State>
