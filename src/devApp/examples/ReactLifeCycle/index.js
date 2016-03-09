/* eslint react/prop-types:0 */
/* eslint-disable */

export const title = 'React Life Cycle'
export const hide = true
export const tags = []
export const date = new Date('Feb 12, 2016')
export const description = ``
export code from '!!raw!./'

import React from 'react'
import _ from 'lodash/fp'

export const Component = React.createClass({
  componentWillMount() {
    console.log('componentWillMount - ' + this.props.number)
  },
  componentDidMount() {
    console.log('componentDidMount - ' + this.props.number)
  },
  componentWillReceiveProps() {
    console.log('componentWillReceiveProps - ' + this.props.number)
  },
  componentWillUpdate() {
    console.log('componentWillUpdate - ' + this.props.number)
  },
  componentDidUpdate() {
    console.log('componentDidUpdate - ' + this.props.number)
  },
  componentWillUnmount() {
    console.log('componentWillUnmount - ' + this.props.number)
  },
  render() {
    return <div>{this.props.number}</div>
  }
})

export const DataVis = React.createClass({
  getInitialState() {
    return {n: 2}
  },
  componentWillMount() {
    console.log('componentWillMount - wrap')
  },
  componentDidMount() {
    console.log('componentDidMount - wrap')
  },
  componentWillReceiveProps() {
    console.log('componentWillReceiveProps - wrap')
  },
  componentWillUpdate() {
    console.log('componentWillUpdate - wrap')
  },
  componentDidUpdate() {
    console.log('componentDidUpdate - wrap')
  },
  componentWillUnmount() {
    console.log('componentWillUnmount - wrap')
  },
  add() {
    this.setState(state => ({n: state.n + 1}))
  },
  remove() {
    this.setState(state => ({n: state.n - 1}))
  },
  render() {
    return (
      <div>
        <div onClick={this.add}>+</div>
        <div onClick={this.remove}>-</div>
        {_.map(
          d => <Component number={d} key={d}/>,
          _.range(0, this.state.n)
        )}
      </div>
    )
  },
})
