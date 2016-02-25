
/* eslint react/prop-types:0 */

export const title = 'Websocket'
export const tags = []
export const hide = true
export const date = new Date('Thu Feb 25 2016 11:13:20 GMT-0500 (EST)')
export const description = ''
export code from '!!raw!./'

import React from 'react'
import {Chart, Lines} from '../../../'

export const Component = props =>
  <Chart>
    <Lines
      data={props.data}
      x='index'
      y='0'
    />
  </Chart>

const dateReviver = (key, value) => {
  if (typeof value === 'string') {
    var a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value)
    if (a) {
      return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4], +a[5], +a[6]))
    }
  }
  return value
}

export const DataVis = React.createClass({
  getInitialState() {
    return {}
  },
  componentDidMount() {
    this.ws = new WebSocket('ws://localhost:5000/')
    this.ws.onmessage = (evt) => {
      this.setState({data: JSON.parse(evt.data, dateReviver)})
    }
  },
  componentWillUnmount() {
    this.ws.close()
  },
  render() {
    return (
      <Component
        data={this.state.data}
      />
    )
  },
})
