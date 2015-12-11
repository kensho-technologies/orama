
import React from 'react'
import _ from 'lodash'
import {csv} from 'd3-request'
import {utcFormat} from 'd3-time-format'

import {App} from '../App'

export function parseString(string) {
  if (/%$/.test(string)) {
    return +string.replace(/%$/, '')
  }
  const number = Number(string)
  if (typeof number === 'number' && !isNaN(number)) {
    return number
  }
  if (/^\d\d\/\d\d\/\d\d\d\d$/.test(string)) {
    return new Date(string)
  }
  return string
}
const parseCSV = data => _.map(data, d => _.mapValues(d, parseString))
const parseDate = utcFormat('%Y-%m-%d').parse

export const Store = React.createClass({
  getInitialState() {
    return {}
  },
  componentDidMount() {
    csv('https://raw.githubusercontent.com/curran/data/gh-pages/bokeh/IBM.csv', (error, payload) => {
      const appl = parseCSV(payload)
      _.each(appl, d => {
        d.Date = parseDate(d.Date)
        d.Name = 'IBM'
        d.Low = d.Low - 100
      })
      this.setState({appl})
    })
    csv('https://raw.githubusercontent.com/curran/data/gh-pages/bokeh/MSFT.csv', (error, payload) => {
      const fb = parseCSV(payload)
      _.each(fb, d => {
        d.Date = parseDate(d.Date)
        d.Name = 'MSFT'
        d.Low = d.Low - 50
      })
      this.setState({fb})
    })
  },
  render() {
    return (
      <App
        appl={this.state.appl}
        fb={this.state.fb}
      />
    )
  },
})
