import * as React from 'react'

import {Chart, Ranges} from 'orama'

const data = [{start: 1, end: 5}, {start: 10, end: 20}, {start: 40, end: 50}, {start: 60, end: 80}]

export default (
  <Chart>
    <Ranges data={data} x1="start" x2="end" y1="start" y2="end" fillValue="lightgray" />
  </Chart>
)
