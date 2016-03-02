
import React from 'react'
import {findDOMNode} from 'react-dom'

import _ from 'lodash/fp'
import {max} from 'd3-array'
import {Column, Row, Block, Inline} from 'react-display'

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
    console.log(colSizes)
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
        height='500'
        {...props}
      >
        {React.Children.map(
          props.children,
          (child, rowIdx) => {
            return React.cloneElement(
              child, {rowIdx, colClbk, colSizes: state.colSizes}
            )
          },
        )}
      </Row>
    )
  }
})

export const TableColumn = React.createClass({
  getDefaultProps() {
    return {
      colSizes: [],
    }
  },
  componentDidMount() {
    // console.log(findDOMNode(this).clientHeight)
  },
  componentDidUpdate() {
    // console.log(findDOMNode(this).clientHeight)
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
        {...props}
      >
        {React.Children.map(
          props.children,
          (child, colIdx) => {
            return React.cloneElement(
              child, {colIdx, rowClbck, colHeight: props.colSizes[colIdx]}
            )
          },
        )}
      </Column>
    )
  }
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
        background='steelblue'
        color='white'
        margin='1'
        padding='5'
        flex='1'
        {...props}
        flexShrink='0'
        height={props.colHeight}
        overflowY='hidden'
      >
        <Inline color='lightgray' fontSize='11' marginRight='10'>
          {`row(${props.colIdx}) `}
        </Inline>
        {props.children}
      </Block>
    )
  }
})
