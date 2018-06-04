import * as React from 'react'

import {Chart, Points} from 'orama'

const data = [
  {date: new Date('2010-01-01'), value: 10},
  {date: new Date('2010-02-01'), value: 17},
  {date: new Date('2010-03-01'), value: 9},
  {date: new Date('2010-04-01'), value: 12},
  {date: new Date('2010-05-01'), value: 10},
]

const theme = {
  textFill: 'white',
  backgroundFill: 'black',
  plotBackgroundFill: 'hsl(0, 0%, 20%)',
  guideStroke: 'hsl(0, 0%, 30%)',
  guideZeroStroke: 'hsl(0, 0%, 55%)',
  plotFill: 'white',
}

export default (
  <Chart theme={theme}>
    <Points data={data} x="date" y="value" />
  </Chart>
)
