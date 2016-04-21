
export const title = 'Timeseries Skim'
export const tags = []
export const hide = true
export const date = new Date('Fri Mar 18 2016 16:34:58 GMT-0400 (EDT)')
export const description = ''
export code from '!!raw!./'
import _ from 'lodash'

import React from 'react'
import {Chart, Lines, Layer} from '../../../'
import {State} from 'on-update'
// import {getPath2D} from '../../../utils/path2DUtils'

const timeSkimLayer = (props) => {
  if (!props.xScale || !props.yScale) return undefined
  return undefined
}

const data1 = _.map(
  _.range(0, 2, 0.1),
  (d) => ({x: d, y: Math.pow(d, 2.5) * 16}),
)

const data2 = [
  {x: 0, y: 2},
  {x: 1, y: 0},
  {x: 2, y: 2},
]

const handleClick = (props) => {
  if (props.data === data1) props.setState({data: data2})
  if (props.data === data2) props.setState({data: data1})
}

export const Component = props =>
  <div>
    <button onClick={() => handleClick(props)}>CHANGE</button>
    <Chart>
      <Lines
        data={props.data}
        x='x'
        y='y'
      />
      <Layer
        plot={timeSkimLayer}
      />
    </Chart>
  </div>

const startWith = props => {
  props.setState({})
}

export const DataVis = props =>
  <State startWith={startWith} data={data1}>
    <Component {...props}/>
  </State>
