/* @flow */

import React, { PropTypes } from 'react'
import R from 'ramda'
import {csv} from 'd3-xhr'
import HTML5Backend from 'react-dnd/modules/backends/HTML5'
import { DragDropContext } from 'react-dnd'

import Chart from './Chart'
import DataList from './DataList'
import DropUI from './DropUI'

var styles = {
  appContainer: {
    margin: 50,
    display: 'flex',
  },
}

var dimensions = {
  x: {
    name: 'prop1',
    path: ['Number of Days Positive'],
    type: 'linear',
  },
  y: {
    name: 'prop2',
    path: ['Cumulative Percent Return'],
    type: 'linear',
  },
}

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

const parseCsv = R.map(R.mapObj(parseString))

/**
 * App component
 */
export const App = React.createClass({
  displayName: 'App',
  propTypes: {
    children: PropTypes.func,
  },
  getInitialState() {
    return {}
  },
  componentDidMount() {
    csv('study-results.csv', (e, csvData) => {
      const data = parseCsv(csvData)
      this.setState({data})
    })
  },
  render(): any {
    return (
      <div style={styles.appContainer}>
        <DataList data={this.state.data}/>
        <DropUI/>
        <Chart
            data={this.state.data}
            dimensions={dimensions}
            size={{ width: 700, height: 500 }}
            margin={{
              left: 80, right: 30,
              top: 15, bottom: 50,
            }}
            />
      </div>
    )
  },
})

export default DragDropContext(HTML5Backend)(App)
