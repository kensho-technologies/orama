/* eslint no-param-reassign:0 */
// site main entry point

import 'babel-regenerator-runtime'
import 'es6-promise'
import 'whatwg-fetch'

import React from 'react'
import ReactDOM from 'react-dom'
import {flow, get, map, zipObject, each} from 'lodash/fp'

import {State} from './devApp/State'
import {Router} from './devApp/Router'
import {App} from './devApp/App'
import {postsData} from './devApp/Post'
import {sectionsData} from './devApp/Section'
import {fetchJson} from './devApp/fetchers'
import {timeParse} from 'd3-time-format'

document.title = 'Orama'

const getDate = timeParse('%Y-%m-%d')

const APPL_URL = 'https://www.quandl.com/api/v3/datasets/WIKI/AAPL/data.json?start_date=2014-01-01&auth_token=WpsneDZ79Xem9zJc5amR'
const FB_URL = 'https://www.quandl.com/api/v3/datasets/WIKI/FB/data.json?start_date=2014-01-01&auth_token=WpsneDZ79Xem9zJc5amR'

const quandlMap = flow(
  get('dataset_data.column_names'),
  zipObject,
)

const quandlFlow = (result, name) =>
  flow(
    get('dataset_data.data'),
    map(quandlMap(result)),
    each(d => {
      d.Name = name
      d.Date = getDate(d.Date)
    })
  )(result)

const startWith = async props => {
  props.setState({
    postsData, sectionsData,
  })
  const applData = await fetchJson(APPL_URL).then(d => quandlFlow(d, 'Apple'))
  const fbData = await fetchJson(FB_URL).then(d => quandlFlow(d, 'Facebook'))
  props.setState({
    applData, fbData,
  })
}

const Root = React.createClass({
  render: () =>
    <State startWith={startWith}>
      <Router>
        <App/>
      </Router>
    </State>,
})

ReactDOM.render(<Root/>, document.getElementById('root'))
