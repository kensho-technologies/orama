import * as React from 'react'

import {Chart, Lines} from 'orama'

const data = [
  [
    {date: new Date('2010-01-01'), value: 10, name: 'A'},
    {date: new Date('2010-02-01'), value: 17, name: 'A'},
    {date: new Date('2010-03-01'), value: 9, name: 'A'},
  ],
  [
    {date: new Date('2010-01-01'), value: 16, name: 'B'},
    {date: new Date('2010-02-01'), value: 13, name: 'B'},
    {date: new Date('2010-03-01'), value: 15, name: 'B'},
  ],
]

export default (
  <Chart>
    <Lines data={data} x="date" y="value" stroke="name" />
  </Chart>
)
