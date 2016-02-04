/* eslint react/prop-types:0 */

import React from 'react'

import {Chart, Lines, Points} from '../../../'
import {State} from '../../State'
import {fetchQuandl} from '../../fetchers'

export const title = 'Connected Scatterplot'
export const tags = []
export const date = new Date('Feb 3, 2016')

const Component = props =>
  <Chart
    radiusRange={[2, 8]}
  >
    <Lines
      data={props.data}
      stroke='Name'
      title='Name'
      x='Adj. Volume'
      y='Adj. Close'
    />
    <Points
      data={props.data}
      fill='Name'
      radius='Date'
      strokeValue=''
      title='Name'
      x='Adj. Volume'
      y='Adj. Close'
    />
  </Chart>

const getURL = ticker =>
  `https://www.quandl.com/api/v3/datasets/WIKI/${ticker}/data.json?start_date=2015-01-01&collapse=monthly&auth_token=WpsneDZ79Xem9zJc5amR`

const startWith = async props =>
  props.setState({
    data: await Promise.all([
      fetchQuandl(getURL('GOOGL'), 'GOOGL'),
      fetchQuandl(getURL('MMM'), 'MMM'),
      fetchQuandl(getURL('ADBE'), 'ADBE'),
      fetchQuandl(getURL('AMZN'), 'AMZN'),
      fetchQuandl(getURL('CVX'), 'CVX'),
    ]),
  })

export const DataVis = () =>
  <State startWith={startWith}>
    <Component/>
  </State>

export const description = `Data for the example is composed of an Array<Array<Objects>>, each Object represents a point and each Array<Objects> an array of points.
The same data can be used for drawing the lines and points using two layers on the chart.`
export const imports = `import {Chart, Lines, Points} from 'orama'
import {State} from '../../State'
import {fetchQuandl} from '../../fetchers'`
export const code = `const Component = props =>
  <Chart>
    <Lines
      data={props.data}
      stroke='Name'
      title='Name'
      x='Adj. Volume'
      y='Adj. Close'
    />
    <Points
      data={props.data}
      stroke='Name'
      fill='Name'
      title='Name'
      x='Adj. Volume'
      y='Adj. Close'
    />
  </Chart>

const getURL = ticker =>
  \`https://www.quandl.com/api/v3/datasets/WIKI/\${ticker}/data.json?start_date=2015-01-01&collapse=monthly&auth_token=WpsneDZ79Xem9zJc5amR\`

const startWith = async props =>
  props.setState({
    data: await Promise.all([
      fetchQuandl(getURL('GOOGL'), 'GOOGL'),
      fetchQuandl(getURL('MMM'), 'MMM'),
      fetchQuandl(getURL('ADBE'), 'ADBE'),
      fetchQuandl(getURL('AMZN'), 'AMZN'),
      fetchQuandl(getURL('CVX'), 'CVX'),
    ]),
  })

export const DataVis = () =>
  <State startWith={startWith}>
    <Component/>
  </State>`
