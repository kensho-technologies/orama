
import React from 'react'
import {findDOMNode} from 'react-dom'

import _ from 'lodash/fp'
import {max} from 'd3-array'
import {Column, Row, Block} from 'react-display'

export const Table = React.createClass({
  getInitialState() {
    return {colSizes: []}
  },
  data: [],
  componentDidMount() { this.mountUpdate() },
  componentDidUpdate() { this.mountUpdate() },
  mountUpdate() {
    const length = max(this.data, d => d.length)
    const colSizes = _.map(
      idx => max(this.data, d => d[idx]),
      _.range(0, length),
    )
    this.setState({colSizes})
  },
  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(this.state.colSizes, nextState.colSizes)
  },
  colClbk(input) {
    this.data = _.set(`${input.rowIdx}.${input.colIdx}`, input.width, this.data)
  },
  render() {
    const {props, state, colClbk} = this
    return (
      <Row
        background='steelblue'
        padding='1'
        boxSizing='border-box'
        {...props}
      >
        {React.Children.map(
          props.children,
          (child, rowIdx) =>
            React.cloneElement(
              child, {rowIdx, colClbk, colSizes: state.colSizes}
            ),
        )}
      </Row>
    )
  },
})

export const TableColumn = React.createClass({
  getDefaultProps() {
    return {
      colSizes: [],
    }
  },
  componentDidMount() {
  },
  componentDidUpdate() {
  },
  rowClbck(values) {
    const {props} = this
    props.colClbk({
      width: values.width,
      rowIdx: props.rowIdx,
      colIdx: values.colIdx,
    })
  },
  render() {
    const {props, rowClbck} = this
    return (
      <Column
        background='lightgray'
        color='white'
        margin='1'
        padding='1'
        position='relative'
        boxSizing='border-box'
        {...props}
      >
        {React.Children.map(
          props.children,
          (child, colIdx) =>
            React.cloneElement(
              child, {colIdx, rowClbck, colHeight: props.colSizes[colIdx]}
            ),
        )}
      </Column>
    )
  },
})

export const TableCell = React.createClass({
  componentDidMount() { this.mountUpdate() },
  componentDidUpdate() { this.mountUpdate() },
  mountUpdate() {
    const {props} = this
    if (props.colHeight) return
    props.rowClbck({
      width: findDOMNode(this).clientHeight,
      colIdx: props.colIdx,
    })
  },
  render() {
    const {props} = this
    return (
      <Block
        position='relative'
        boxSizing='border-box'
        background='steelblue'
        color='white'
        margin='1'
        padding='5'
        {...props}
        flexShrink='0'
        height={props.colHeight ? props.colHeight : props.height}
        overflowY='hidden'
      >
        {props.children}
      </Block>
    )
  },
})
