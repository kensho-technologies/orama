/* eslint react/prop-types:0 */

export const title = 'Refs'
export const hide = true
export const tags = []
export const date = new Date('Feb 12, 2016')
export const description = ``
export code from '!!raw!./'

import React from 'react'
import {Chart, Lines} from '../../../'

const FuncComponent = () =>
  <div>FuncComp</div>

// FuncComponent.customMethod = () => console.log('value')

export const Component = React.createClass({
  statics: {
    customMethod: (a) => 12 + a,
  },
  customMethod2() {
    console.log(this.props)
  },
  render: () => <div>Test</div>,
})

export const DataVis = React.createClass({
  handleRef(node) {
    // console.log(node, this)
  },
  render() {
    return (
      <div>
        <Component ref={this.handleRef} test/>
        <Component ref='Component2' test/>
        <FuncComponent ref='FuncComponent' test/>
      </div>
    )
  },
})
