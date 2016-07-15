/* eslint no-param-reassign:0, react/prefer-stateless-function:0 */
// site main entry point

import 'babel-regenerator-runtime'
import 'es6-promise'
import 'whatwg-fetch'

import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash/fp'

import {State} from 'on-update'
import {Router} from './devApp/Router'
import {App} from './devApp/App'
import {sectionsData} from './devApp/Section'
import {fetchJson} from './devApp/fetchers'
import {timeParse} from 'd3-time-format'

_.map = _.map.convert({cap: false})

document.title = 'Orama'

const getDate = timeParse('%Y-%m-%d')

const APPL_URL = 'https://www.quandl.com/api/v3/datasets/WIKI/AAPL/data.json?start_date=2000-01-01&auth_token=WpsneDZ79Xem9zJc5amR'
const FB_URL = 'https://www.quandl.com/api/v3/datasets/WIKI/FB/data.json?start_date=2000-01-01&auth_token=WpsneDZ79Xem9zJc5amR'

const quandlMap = _.flow(
  _.get('dataset_data.column_names'),
  _.zipObject,
)

const quandlFlow = (result, name) =>
  _.flow(
    _.get('dataset_data.data'),
    _.map(quandlMap(result)),
    _.each(d => {
      d.Name = name
      d.Date = getDate(d.Date)
    }),
    _.sortBy('Date'),
  )(result)

const startWith = async props => {
  props.setState({
    sectionsData, codeStyle: 'Bundler',
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
