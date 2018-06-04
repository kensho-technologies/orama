import * as React from 'react'

import {Chart, Areas} from 'orama'

const data = [
  {date: new Date('2010-01-01'), valueTop: 10, valueBt: 5},
  {date: new Date('2010-02-01'), valueTop: 17, valueBt: 7},
  {date: new Date('2010-03-01'), valueTop: 3, valueBt: 1},
  {date: new Date('2010-04-01'), valueTop: 12, valueBt: 10},
  {date: new Date('2010-05-01'), valueTop: 7, valueBt: -5},
]

export default (
  <Chart yZeroBased>
    <Areas data={data} x="date" y="valueTop" y0="valueBt" />
  </Chart>
)
