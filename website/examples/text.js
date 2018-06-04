import * as React from 'react'

import {Chart, Points, Text} from 'orama'

const data = [
  {date: new Date('2010-01-01'), value: 10, letter: 'A'},
  {date: new Date('2010-02-01'), value: 17, letter: 'B'},
  {date: new Date('2010-03-01'), value: 9, letter: 'C'},
]

export default (
  <Chart>
    <Points data={data} x="date" y="value" />
    <Text
      data={data}
      x="date"
      y="value"
      text="letter"
      fillValue="white"
      textAlignValue="center"
      yOffsetValue={5}
    />
  </Chart>
)
