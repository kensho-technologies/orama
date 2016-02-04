import React, {PropTypes} from 'react'

import {Chart, Lines, Points} from '../../../'
import {State} from '../../State'
import {fetchQuandl} from '../../fetchers'

export const title = 'Connected Scatterplot'
export const tags = []
export const date = new Date('Feb 3, 2016')

export const DataVis = () =>
  <State startWith={startWith}>
    <Component/>
  </State>

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

const getURL = ticker =>
  `https://www.quandl.com/api/v3/datasets/WIKI/${ticker}/data.json?start_date=2015-01-01&collapse=monthly&auth_token=WpsneDZ79Xem9zJc5amR`

const Component = props =>
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

export const description = ``
export const imports = `import {Chart, Lines, Points} from 'orama'
import {State} from '../../State'
import {fetchQuandl} from '../../fetchers'`
export const code = `export const DataVis = () =>
  <State startWith={startWith}>
    <Component/>
  </State>

const startWith = async props =>
  props.setState({
    data: await Promise.all([
      fetchQuandl(getURL('FB'), 'FB'),
      fetchQuandl(getURL('GOOGL'), 'GOOGL'),
      fetchQuandl(getURL('MMM'), 'MMM'),
      fetchQuandl(getURL('ADBE'), 'ADBE'),
      fetchQuandl(getURL('AMZN'), 'AMZN'),
      fetchQuandl(getURL('AAL'), 'AAL'),
    ]),
  })

const getURL = ticker =>
  \`https://www.quandl.com/api/v3/datasets/WIKI/\${ticker}/data.json?start_date=2010-01-01&collapse=annual&auth_token=WpsneDZ79Xem9zJc5amR\`

const Component = props =>
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
  </Chart>`
