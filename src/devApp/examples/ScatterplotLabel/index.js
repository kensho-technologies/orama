
export const title = 'Scatterplot Labels'
export const tags = []
export const hide = false
export const date = new Date('Fri May 13 2016 12:03:13 GMT-0400 (EDT)')
export const description = `The ScatterplotLabels layer run a simulation to position the labels based on their size and archor point. The simulation is expensive, non-deterministic and give better result with less points.
The number of points to be labelled can be controlled by filtering the data being given to the layer.`
export code from '!!raw!./'

import React from 'react'
import {Chart, Points, Highlight, ScatterplotLabels} from '../../../'
import {State} from 'on-update'
import _ from 'lodash'

export const Component = (props) => {
  const data = _.slice(props.fbData, 20, 50)
  return <Highlight
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
        data={data}
        x='Volume'
        y='Adj. Close'
      />
      <ScatterplotLabels
        data={data}
        x='Volume'
        y='Adj. Close'
        text='Name'
      />
    </Chart>
  </Highlight>
}

const startWith = props => {
  props.setState({})
}

export const DataVis = props =>
  <State startWith={startWith}>
    <Component {...props}/>
  </State>
