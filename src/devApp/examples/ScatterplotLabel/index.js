
export const title = 'Scatterplot Labels'
export const tags = []
export const hide = false
export const date = new Date('Fri May 13 2016 12:03:13 GMT-0400 (EDT)')
export const description = ''
export code from '!!raw!./'

import React from 'react'
import {Chart, Points, Highlight, ScatterplotLabels} from '../../../'
import {State} from 'on-update'
import _ from 'lodash'

const testData = [
  {text: 'Facebook', x: 45, y: 30},
  {text: 'Amazon', x: 102, y: 72},
  {text: 'Netflix', x: 12, y: 120},
  {text: 'Google', x: 27, y: 87.5},
  {text: 'Google', x: 27, y: 90.5},
]

export const Component = (props) =>
  <Highlight
    Component={Points}
    componentProps={{
      x: 'Volume',
      y: 'Adj. Close',
      radiusValue: 5,
      alphaValue: 1,
    }}
  >
    <Chart>
      <Points
        data={_.slice(props.fbData, 20, 50)}
        x='Volume'
        y='Adj. Close'
      />
      <ScatterplotLabels
        data={_.slice(props.fbData, 20, 50)}
        x='Volume'
        y='Adj. Close'
        text='Name'
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
