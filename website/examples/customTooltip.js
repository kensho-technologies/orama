import * as React from 'react'

import {Chart, Points} from 'orama'

const data = [
  {date: new Date('2010-01-01'), value: 10},
  {date: new Date('2010-02-01'), value: 17},
  {date: new Date('2010-03-01'), value: 9},
  {date: new Date('2010-04-01'), value: 12},
  {date: new Date('2010-05-01'), value: 10},
]

const Tooltip = () => <div>I am a tooltip!</div>

export default (
  <Chart Tooltip={Tooltip}>
    <Points data={data} x="date" y="value" />
  </Chart>
)
