import * as React from 'react'

import {Chart, Lines, Points} from 'orama'

const data = [
  {date: new Date('2010-01-01'), value: 10},
  {date: new Date('2010-02-01'), value: 17},
  {date: new Date('2010-03-01'), value: 9},
  {date: new Date('2010-04-01'), value: 12},
  {date: new Date('2010-05-01'), value: 10},
]

export default (
  <Chart>
    <Lines data={data} x="date" y="value" strokeValue="lightgray" lineDashValue={[5, 5]} />
    <Lines data={data} x="date" y="value" interpolate />
    <Points data={data} x="date" y="value" />
  </Chart>
)
