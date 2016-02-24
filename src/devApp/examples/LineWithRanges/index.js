
/* eslint react/prop-types:0 */

import _ from 'lodash/fp'

export const title = 'Line with ranges'
export const tags = []
export const hide = false
export const date = new Date('Wed Feb 24 2016 17:31:17 GMT-0500 (EST)')
export const description = ''
export code from '!!raw!./'

import React from 'react'
import {Chart, Lines, Ranges} from '../../../'
import {State} from 'on-update'

const rangesData = [
  {x1: new Date(2013, 6, 15), x2: new Date(2013, 10)},
  {x1: new Date(2014, 1, 0), x2: new Date(2014, 3)},
  {x1: new Date(2015, 6, 0), x2: new Date(2015, 8)},
]

const filterData = (priceData) =>
  _.map(
    range => _.filter(d => d.Date >= range.x1 && d.Date <= range.x2, priceData),
    rangesData
  )

export const Component = props =>
  <Chart>
    <Ranges
      data={rangesData}
      fillValue='lightgray'
      x1='x1' x2='x2'
    />
    <Lines
      data={props.fbData}
      x='Date'
      y='Adj. Close'
    />
    <Lines
      data={filterData(props.fbData)}
      strokeValue='blue'
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
