import * as React from 'react'

import {Chart, Bars} from 'orama'

const data = [
  {start: 1, end: 5, amount: 5},
  {start: 5, end: 15, amount: 10},
  {start: 15, end: 30, amount: 50},
  {start: 30, end: 80, amount: 20},
]

export default (
  <Chart yZeroBased>
    <Bars data={data} x1="start" x2="end" y="amount" />
  </Chart>
)
