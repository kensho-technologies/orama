/* @flow */

import React, { PropTypes } from 'react'
import R from 'ramda'
import {csv} from 'd3-xhr'
import HTML5Backend from 'react-dnd/modules/backends/HTML5'
import { DragDropContext } from 'react-dnd'

import Vis from '../Vis'

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
    csv('study-results2.csv', (e, csvData) => {
      const data = parseCsv(csvData)
      this.setState({data})
      // stress test
      // const dataR = R.map(() => {
      //   return {
      //     p1: Math.random(),
      //     p2: Math.random(),
      //   }
      // }, R.range(0, 10000))
      // this.setState({data: dataR})
    })
  },
  render(): any {
    return (
      <div>
        <Vis data={this.state.data}/>
      </div>
    )
  },
})

export default DragDropContext(HTML5Backend)(App)