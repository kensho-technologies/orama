import * as React from 'react'

import {Chart, Points, Text} from 'orama'

const data = [
  {date: new Date('2010-01-01'), value: 10, letter: 'A'},
  {date: new Date('2010-02-01'), value: 17, letter: 'B'},
  {date: new Date('2010-03-01'), value: 9, letter: 'C'},
  {date: new Date('2010-04-01'), value: 12, letter: 'D'},
  {date: new Date('2010-05-01'), value: 10, letter: 'E'},
]

export default (
  <Chart>
    <Points data={data} x="date" y="value" radiusValue={10} />
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
